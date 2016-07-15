// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride      = {};
Pride.Util = {};
Pride.Core = {};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Settings = {
  // default_cache_size:  If a cache size isn't set for a datastore, this value
  //                      is used instead.
  //
  // cache_size:          Key-value pairs where each key is the UID of a
  //                      datastore, and the value gives the cache size for that
  //                      particular datastore.
  //
  // datastores_url:      URL from which Pride can get all the possible
  //                      datastores.
  //
  // connection_attempts: How many times Pride will attempt an HTTP request
  //                      before giving up (overridden by some things such as
  //                      Pride.init()).
  //
  // init_attempts:       How many times Pride will attempt to initialize before
  //                      giving up.
  //
  // ms_between_attempts: How long Pride will wait to try another HTTP request
  //                      after one fails.
  //
  // message_formats:     Key-value pairs where each key is the ID of a message
  //                      type and the value is what that message should say. A
  //                      dollar sign preceded by a number will be replaced when
  //                      the message is created.
  //
  // obnoxious:           If true, debug messages will be logged to the console
  //                      as Pride runs. WARNING: Pride can send out a lot of
  //                      debug messages.

  default_cache_size: 100,
  cache_size: {

  },

  datastores_url: '',

  connection_attempts: 3,
  init_attempts:       3,
  ms_between_attempts: 1500,

  message_formats: {
    failed_record_load: 'Failed to load $1',
    failed_search_run:  'Failed to search $1',
    failed_init:        'Failed to initialize Pride'
  },

  obnoxious: false
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Core.Datastore = function(datastore_info) {
  datastore_info = Pride.Util.deepClone(datastore_info);

  this.baseQuery = function() {
    return new Pride.Core.Query({
             uid:        datastore_info.uid,
             sort:       datastore_info.default_sort,
             start:      0,
             count:      0,
             settings:   {},
             field_tree: fillFieldTree(),
             facets:     _.reduce(
                           datastore_info.facets,
                           function(memo, facet) {
                             if (facet.required && !facet.fixed) {
                               memo[facet.uid] = facet.default_value;
                             }

                             return memo;
                           },
                           {}
                         )
           });
  };

  this.baseSearch = function() {
    return new Pride.Core.DatastoreSearch({datastore: this});
  };

  this.runQuery = function(request_arguments) {
    request_arguments.url = datastore_info.url;
    Pride.Util.request(request_arguments);

    return this;
  };

  this.get = function(key) {
    if (key != 'url') {
      return datastore_info[key];
    }
  };

  this.update = function(new_info) {
    _.extend(datastore_info, new_info);
  };

  var fillFacets = function(set_facets) {
    return _.reduce(
             datastore_info.facets,
             function(memo, facet) {
               memo[facet.uid] = _.find(set_facets, function(possible_facet) {
                                   return possible_facet.uid === facet.uid;
                                 }) ||
                                 facet;

               return memo;
             },
             {}
           );
  };

  var fillFieldTree = function(given_tree) {
    given_tree = given_tree || new Pride.FieldTree.FieldBoolean('AND');

    output = _.reduce(
               datastore_info.fields,
               function(tree, field) {
                 if ((field.required || field.fixed) &&
                     !tree.contains({ type: 'field', value: field.uid })) {

                   missing_field = new Pride.FieldTree.Field(
                                     field.uid,
                                     new Pride.FieldTree.Literal(field.default_value)
                                   );

                   if (_.isMatch(tree, { type: 'field_boolean', value: 'AND' })) {
                    return tree.addChild(missing_field);
                   } else {
                    return new Pride.FieldTree.FieldBoolean('AND', tree, missing_field);
                   }
                 }

                 return tree;
               },
               given_tree
             );

    return output.matches({ type: 'field_boolean', children: [] }) ? {} : output;
  };
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Core.DatastoreSearch = function(setup) {
  var self = this;
  var base = new Pride.Core.SearchBase(setup, this);

  base.createItem = function(item_data) {
    return new Pride.Core.Record(item_data);
  };

  ////////////////////
  // Facet Searches //
  ////////////////////

  var facet_searches = [];
  var current_facets = [];

  this.getFacets = function() {
    return facet_searches;
  };

  //////////////////
  // Data Getters //
  //////////////////

  this.uid = base.datastore.get('uid');

  this.getData = function() {
    return {
             uid:             self.uid,
             metadata:        Pride.Util.deepClone(base.datastore.get('metadata')),
             sorts:           Pride.Util.deepClone(base.datastore.get('sorts')),
             selected_sort:   base.query.get('sort'),
             facets:          Pride.Util.deepClone(base.query.get('facets')),
             fields:          Pride.Util.deepClone(base.datastore.get('fields')),
             field_tree:      Pride.Util.deepClone(base.query.get('field_tree')),
             settings:        Pride.Util.deepClone(base.query.get('settings')),
             page:            base.query.get('page'),
             count:           base.query.get('count'),
             total_available: base.query.get('total_available'),
             total_pages:     base.query.get('total_pages'),
             page_limit:      base.query.get('page_limit')
           };
  };

  this.getResults = base.results;

  ///////////////////
  // Observerables //
  ///////////////////

  base.initialize_observables = function() {
    self.runDataObservers.add(function() {
      var facets = base.datastore.get('facets');

      if (!Pride.Util.isDeepMatch(current_facets, facets)) {
        _.each(facet_searches, function(facet_search) {
          facet_search.clearAllObservers();
        });

        facet_searches = _.map(
                           facets,
                           function(facet_data) {
                             return new Pride.Core.FacetSearch({
                               data:    _.omit(facet_data, 'values'),
                               results: facet_data.values
                             });
                           }
                         );

        current_facets = facets;

        self.facetsObservers.notify();
      }
    });
  };

  this.getMute = base.getMute;

  this.setMute = function(state) {
    _.each(facet_searches, function(facet) { facet.setMute(state); });
    base.setMute(state);

    return self;
  };

  base.createObservable('facets', this.getFacets)
      .initialize_observables();
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Core.FacetSearch = function(setup) {
  example_facet = this;
  var data    = setup.data;
  var results = setup.results;

  //////////////////
  // Data Getters //
  //////////////////

  this.uid        = data.uid;
  this.getData    = function() { return data; };
  this.getResults = function() { return results; };

  ////////////
  // Muting //
  ////////////

  var muted = false;

  this.getMute = function() { return muted; };

  this.setMute = function(state) {
    muted = state;

    return self;
  };

  ///////////////////
  // Observerables //
  ///////////////////

  var observables = [];

  this.clearAllObservers = function() {
    _.each(observables, function(observable) {
      observable.clearAll();
    });

    return self;
  };

var createObservable = function(name, data_func) {
    var object = new Pride.Util.FuncBuffer(function() {
                   var add_observer   = this.add;
                   var call_observers = this.call;

                     observables.push(this);

                   this.add = function(func) {
                     if (!self.muted) func(data_func());

                     add_observer(func, 'observers');

                     return this;
                   };

                   this.notify = function() {
                     if (!self.muted) {
                       data = data_func();
                       self.log('NOTIFY (' + name + ')', data);

                       call_observers('observers', data);
                     }

                     return this;
                   };
                 });

    return object;
  };

  this.resultsObservers = createObservable('results', this.getResults);
  this.setDataObservers = createObservable('setData', this.getData);
  this.runDataObservers = createObservable('runData', this.getData);
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.FieldTree = {};

// Factory for creating functions to create various field tree node types.
Pride.Core.nodeFactory = function(type, child_types, extention) {
  return function(value) {
           this.children     = Pride.Util.slice(arguments, 1);
           this.type         = type;
           this.value        = value.trim();
           this.child_types  = child_types || [];
           this.validIfEmpty = true;

           // Check to make sure a child is valid for this node.
           // If it is, add it to the array of children.
           this.addChild = function(new_child) {
             if (_.find(
                   this.child_types,
                   function(a_type) { return new_child.type === a_type; }
                 )) {
               this.children.push(new_child);
             } else {
               throw 'Not a valid child for a ' + this.type;
             }

             return this;
           };

           // Check to see if this object is, or contains, an object which
           // which matches the query object.
           this.contains = function(query) {
             if (this.matches(query)) {
               return this;
             } else if (_.isEmpty(this.children)) {
               return false;
             } else {
               return _.find(this.children, function(possible) {
                        return possible.contains(query);
                      });
             }
           };

           this.matches = function(query) {
             var this_node = this;
             var query_children = query.children || [];

             return _.every(
                      _.omit(query, 'children'),
                      function(value, key) { return this_node[key] == value; }
                    ) &&
                    _.every(
                      query_children,
                      function(query_child) {
                        return _.any(
                                 children,
                                 function(real_child) {
                                   return query_child.matches(real_child);
                                 }
                               );
                      }
                    );
           };

           this.serialize = function() { return value; };

           this.serializedChildren = function() {
             return _.chain(this.children)
                     .map(function(child) { return child.serialize(); })
                     .compact()
                     .value();
           };

           this.toJSON = function() {
             return _.pick(this, 'value', 'children', 'type');
           };

           // If an extention function was given, call it with this.
           if (_.isFunction(extention)) { extention.call(this); }
         };
};


// Specialized version of Pride.nodefactory() which produces boolean
// nodes.
Pride.Core.boolNodeFactory = function(type, child_types) {
  return Pride.Core.nodeFactory(
           type,
           child_types,
           function () {
             // Ensure that only valid boolean values are given.
             if (!(_.contains(['AND', 'OR', 'NOT'], this.value))) {
               throw 'Not a valid boolean value';
             }

             this.serialize = function() {
               return this.serializedChildren()
                          .join(' ' + this.value + ' ');
             };

             this.serializedChildren = function() {
               var this_node = this;

               return _.chain(this_node.children)
                       .map(function(child) {
                         if (child.type == this_node.type ||
                            (child.type == 'literal' && child.value.match(/\s/))) {
                           return '(' + child.serialize() + ')';
                         } else {
                           return child.serialize();
                         }
                       })
                       .compact()
                       .value();
             };
           }
         );
};

// Possible node types.
var top_level_nodes    = ['field_boolean', 'field'];
var inside_field_nodes = ['value_boolean', 'literal', 'tag', 'special'];

// Create constructor functions for all the various node types.

Pride.FieldTree.FieldBoolean = Pride.Core.boolNodeFactory(
                                 'field_boolean',
                                 top_level_nodes
                               );

Pride.FieldTree.ValueBoolean = Pride.Core.boolNodeFactory(
                                 'value_boolean',
                                 inside_field_nodes
                               );

Pride.FieldTree.Field = Pride.Core.nodeFactory(
  'field',
  inside_field_nodes,
  function() {
    this.serialize = function() {
      return this.value + ': (' +
               this.serializedChildren().join(' ') +
             ')';
    };
  }
);

Pride.FieldTree.Tag = Pride.Core.nodeFactory(
  'tag',
  inside_field_nodes,
  function() {
    this.serialize = function() {
      var serialized_children = this.serializedChildren();
      if (serialized_children.length === 0) {
        return '';
      } else {
        return this.value + '(' + serialized_children.join(' ') + ')';
      }
    };
  }
);

Pride.FieldTree.Literal = Pride.Core.nodeFactory('literal');
Pride.FieldTree.Special = Pride.Core.nodeFactory('special');

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Util.FuncBuffer = function(extension) {
  var buffer = {};
  var self   = this;

  var safeGet = function(name) {
    if (!_.has(buffer, name)) buffer[name] = [];

    return buffer[name];
  };

  this.add = function(func, name) {
    safeGet(name).push(func);

    return self;
  };

  this.remove = function(func, name) {
    buffer[name] = _.reject(
                     safeGet(name),
                     function(other_func) { return func == other_func; }
                   );

    return self;
  };

  this.clear = function(name) {
    delete buffer[name];

    return self;
  };

  this.clearAll = function() {
    buffer = {};

    return self;
  };

  this.call = function(name) {
    self.apply(name, Pride.Util.slice(arguments, 1));

    return self;
  };

  this.apply = function(name, args) {
    _.each(safeGet(name), function(func) { Pride.Util.safeApply(func, args); });

    return self;
  };

  if (_.isFunction(extension)) extension.call(this);
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Util.MultiSearch = function(uid, muted, search_array) {
  var query_data = {};
  var self       = this;

  this.searches = search_array;
  this.uid      = uid;

  this.set = function(values) {
    _.extend(query_data, values);

    _.each(
      search_array,
      function(search) { search.set(values); }
    );

    return self;
  };

  var funcOnEach = function(func_name, before_func) {
    return function() {
             var args = Pride.Util.slice(arguments);

             Pride.Util.safeApply(before_func, args);

             _.each(search_array, function(search) {
               search[func_name].apply(search, args);
             });

             return self;
           };
  };

  this.run      = funcOnEach('run');
  this.nextPage = funcOnEach('nextPage');
  this.prevPage = funcOnEach('prevPage');
  this.setMute  = funcOnEach('setMute', function(state) { muted = state; });

  this.getMute = function() {
    return muted;
  };

  this.setMute(muted);
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Util.Paginater = function(initial_values) {
  this.set = function(new_values) {

    ////////////////////////
    // Basic error checks //
    ////////////////////////

    if (_.has(new_values, 'total_pages')) {
      throw 'Can not set total_pages (it is a calculated value)';
    }

    if (_.has(new_values, 'index_limit')) {
      throw 'Can not set index_limit (it is a calculated value)';
    }

    if (_.intersection(['start', 'end', 'count'], _.keys(new_values)).length > 2) {
      throw 'Can not set start, end and count all at the same time';
    }

    if (_.has(new_values, 'page') &&
        (_.has(new_values, 'start') || _.has(new_values, 'end'))
       ) {
      throw 'Can not set page as well as the start and/or end';
    }

    //////////////////////////////
    // Set and calculate values //
    //////////////////////////////

    _.extend(values, _.omit(new_values, 'end'));

    // If the page is being set, we have to update the start.
    if (_.has(new_values, 'page')) {
      values.start = (values.count || 0) * (values.page - 1);
    }

    // If the end is being set, we calculate what start or count should now be.
    if (_.has(new_values, 'end')) {
      if (_.has(new_values, 'count')) {
        // If we are also setting the count, calculate a new start.
        values.start = Math.max(
                         new_values.end,
                         new_values.end - (values.count - 1)
                       );
      // If we are not setting the count, calculate a new count.
      } else {
        // Throw an error if the start now comes after the end, because that
        // makes no sense at all.
        if (values.start <= new_values.end) {
          values.count = (new_values.end - values.start) + 1;
        } else {
          throw 'The start value can not be greater than the end value';
        }
      }

      // We wait to set the new end value until after an exception can be thrown.
      values.end = new_values.end;
    } else {
      // Calculate what the new end value should be.
      var end = values.start + values.count - 1;
      values.end = (end < values.start) ? undefined : end;
    }

    // Calculate what the last index can be.
    if (!_.isNumber(values.total_available)) {
      values.index_limit = Infinity;
    } else if (values.total_available > 0) {
      values.index_limit = values.total_available - 1;
    } else {
      values.index_limit = undefined;
    }

    //////////////////////////
    // Calculate pagination //
    //////////////////////////

    if (values.count > 0 && values.start % values.count === 0) {
      values.page = Math.floor(values.start / values.count) + 1;

      if (_.isNumber(values.total_available)) {
        values.total_pages = Math.ceil(values.total_available / values.count);
        values.page_limit  = values.total_pages;
      } else {
        values.total_pages = undefined;
        values.page_limit  = Infinity;
      }
    } else {
      values.page        = undefined;
      values.total_pages = undefined;
      values.page_limit  = undefined;
    }

    //////////////////////////////////////
    // Check to make sure enough is set //
    //////////////////////////////////////

    if (!_.has(values, 'start') || !_.has(values, 'count')) {
      throw 'Not enough information given to create Paginater';
    }

    return this;
  };

  this.get = function(name) {
    return values[name];
  };

  // Set the initial values.
  var values = {};
  this.set(initial_values);
};

Pride.Util.Paginater.getPossibleKeys = function() {
  return [
           'start',
           'count',
           'end',
           'page',
           'index_limit',
           'total_pages',
           'total_available',
           'page_limit'
         ];
};

Pride.Util.Paginater.hasKey = function(key) {
  return Pride.Util.Paginater.getPossibleKeys().indexOf(key) > -1;
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Core.Query = function(query_info) {
  // Setup the paginater to do all pagination calculations.
  var paginater = new Pride.Util.Paginater({
                    start: query_info.start,
                    count: query_info.count
                  });

  // Memoize the paginater keys for future use.
  var paginater_keys = Pride.Util.Paginater.getPossibleKeys();

  // Remove the pagination info from query_info.
  query_info = _.omit(Pride.Util.deepClone(query_info), paginater_keys);

  // Set the default request_id if it isn't already set.
  query_info.request_id = query_info.request_id || 0;

  this.get = function(key) {
    if (Pride.Util.Paginater.hasKey(key)) {
      return paginater.get(key);
    } else {
      return query_info[key];
    }
  };

  this.set = function(new_values) {
    var new_pagination_values = _.pick(new_values, paginater_keys);
    var new_query_values      = _.omit(new_values, paginater_keys);

    // If the set of things being searched was altered...
    if (!_.isEmpty(new_query_values)) {
      paginater.set({ total_available: undefined });

      if (!_.isNumber(new_query_values.request_id)) {
        query_info.request_id += 1;
      }
    }

    paginater.set(new_pagination_values);
    _.extend(query_info, new_query_values);

    return this;
  };

  this.clone = function() {
    var full_info   = Pride.Util.deepClone(query_info);
    full_info.start = paginater.get('start');
    full_info.count = paginater.get('count');

    return new Pride.Core.Query(full_info);
  };

  this.toSection = function() {
    return new Pride.Util.Section(this.get('start'), this.get('end'));
  };

  this.toLimitSection = function() {
    return new Pride.Util.Section(this.get('start'), this.get('index_limit'));
  };

  this.toJSON = function() {
    return {
             uid:        this.get('uid'),
             request_id: this.get('request_id'),
             start:      this.get('start'),
             count:      this.get('count'),
             field_tree: this.get('field_tree'),
             facets:     this.get('facets'),
             sort:       this.get('sort'),
             settings:   this.get('settings')
           };
  };
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Core.Record = function(data) {
  var request_buffer = new Pride.Util.RequestBuffer({
                         url: data.source,
                         failure_message: Pride.Messenger.preset(
                                            'failed_record_load',
                                            data.names[0]
                                          ),
                         edit_response: function(response) {
                           data = translateData(response.results[0]);

                           return data;
                         }
                       });

  this.renderPart = function(func) {
    callWithData(func);
  };

  this.renderPartThenCache = function(func) {
    callWithData(func);
    request_buffer.request();
  };

  this.renderFull = function(func) {
    callWithData(func);

    if (!data.complete) {
      request_buffer.request({success: func});
    }
  };

  var callWithData = function(func) {
    func(_.omit(data, 'complete', 'source'), data.complete);
  };

  var translateData = function(new_data) {
    new_data.fields = _.map(
                        new_data.fields,
                        function(field) {
                          if (!field.value_has_html) {
                            field.value = Pride.Util.escape(field.value);
                          }

                          return _.omit(field, 'value_has_html');
                        }
                      );

    if (!new_data.names_have_html) {
      new_data.names = _.map(
                         new_data.names,
                         function(name) {
                           return Pride.Util.escape(name);
                         }
                       );
    }

    return _.omit(new_data, 'names_have_html');
  };

  data = translateData(data);
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Util.RequestBuffer = function(request_options) {
  request_options = request_options || {};

  var func_buffer = new Pride.Util.FuncBuffer();

  var request_issued     = false;
  var request_successful = false;
  var request_failed     = false;

  var cached_response_data;

  this.request = function(func_hash) {
    func_buffer.add(func_hash.success, 'success')
               .add(func_hash.failure, 'failure');

    if (request_issued) {
      callWithResponse();
    } else {
      sendRequest();
    }
  };

  var callWithResponse = function(data) {
    cached_response_data = data || cached_response_data;

    if (request_successful) {
      callThenClear('success');
    } else if (request_failed) {
      callThenClear('failure');
    }
  };

  var sendRequest = function() {
    request_issued = true;

    Pride.Util.request({
      url:             Pride.Util.safeCall(request_options.url),
      attempts:        Pride.Util.safeCall(request_options.attempts) ||
                       Pride.Settings.connection_attempts,
      failure_message: Pride.Util.safeCall(request_options.failure_message),

      failure: function(error) {
        request_failed = true;

        Pride.Util.safeCall(request_options.before_failure, error);

        callWithResponse(error);

        Pride.Util.safeCall(request_options.after_failure, error);
      },

      success: function(response) {
        request_successful = true;

        Pride.Util.safeCall(request_options.before_success, response);

        if (_.isFunction(request_options.edit_response)) {
          response = request_options.edit_response(response);
        }

        callWithResponse(response);

        Pride.Util.safeCall(request_options.after_success, response);
      }
    });
  };

  var callThenClear = function(name) {
    func_buffer.call(name, cached_response_data)
               .clearAll();
  };
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Core.SearchBase = function(setup, parent) {
  this.datastore = setup.datastore;
  this.query     = setup.query || this.datastore.baseQuery();

  var self             = this;
  var requestFunc      = setup.requestFunc || this.datastore.runQuery;
  var results          = setup.starting_results || [];
  var defaultCacheSize = setup.cache_size ||
                         Pride.Settings.cache_size[this.datastore.uid] ||
                         Pride.Settings.default_cache_size;

  this.log = function() {
    var message = Pride.Util.slice(arguments);
    message.unshift('Search (' + self.datastore.get('uid') + ')');

    Pride.Core.log.apply(window, message);
  };

  /////////////////////////
  // Performing Searches //
  /////////////////////////

  this.set = function(set_hash) {
    self.query.set(set_hash);
    Pride.Util.safeCall(self.setDataChanged);

    if (!_.isEmpty(_.omit(set_hash, Pride.Util.Paginater.getPossibleKeys()))) {
      results = [];
    }

    return self;
  };

  this.run = function(cache_size) {
    Pride.Util.safeCall(self.resultsChanged);

    if (_.isUndefined(cache_size)) {
      cache_size = defaultCacheSize;
    }

    requestResults(
      getMissingSection(
        self.query.toSection().expanded(cache_size)
      )
    );

    return self;
  };

  this.results = function() {
    return resultsPiece(new Pride.Util.Section(
             self.query.get('start'),
             Math.min(self.query.get('end'), self.query.get('index_limit'))
           ));
  };

  var requestResults = function(requested_section) {
    self.log('REQUESTING', requested_section);
    self.log('TOTAL AVAILABLE (pre-request)', self.query.get('total_available'));

    if (requested_section &&
        self.query.toLimitSection().overlaps(requested_section)) {

      self.log('Sending query...');

      var new_query = self.query.clone()
                           .set({
                             start: requested_section.start,
                             count: requested_section.calcLength()
                           });

      requestFunc({
        query: new_query,
        failure_message: Pride.Messenger.preset(
                           'failed_search_run',
                           self.datastore.get('metadata').name
                         ),
        success: function(response_data) {
          // Update things if the response matches the current query.
          if (response_data.request.request_id == self.query.get('request_id')) {
            updateData(response_data);
            addResults(response_data.response, new_query.get('start'));

            var response_length = response_data.response.length;

            // If we are missing results from the initial request...
            if (response_length !== 0 &&
                response_length < new_query.get('count')) {
              requestResults(
                requested_section.shifted(response_length, 0)
              );
            }
          }
        }
      });
    } else {
      // We don't need to run a search, but should update run observers in case
      // set() was called since the last run().
      Pride.Util.safeCall(self.runDataChanged);
    }
  };

  var addResults = function(new_items_array, offset) {
    var query_results_added = false;

    self.log('NEW RECORDS', new_items_array);

    _.each(new_items_array, function(item_data, array_index) {
      var item_index = array_index + offset;

      // Update the results that are not already filled.
      if (_.isUndefined(results[item_index])) {
        results[item_index] = Pride.Util.safeCall(self.createItem, item_data);

        if (self.query.toSection().inSection(item_index)) {
          query_results_added = true;
        }
      }
    });

    self.log('CACHE LENGTH', results.length);

    if (query_results_added || _.isEmpty(new_items_array)) {
      Pride.Util.safeCall(self.resultsChanged);
    }
  };

  var updateData = function(response_data) {
    self.datastore.update(response_data.datastore);

    var new_query_data = _.omit(response_data.new_request, 'start', 'count');
    new_query_data.total_available = response_data.total_available;
    self.query.set(new_query_data);

    Pride.Util.safeCall(self.runDataChanged);
  };

  var getMissingSection = function(section) {
    var list  = resultsPiece(section);
    var start = _.indexOf(list, undefined);

    // If the item is not found, indexOf returns -1.
    if (start != -1) {
      var end = section.start + _.lastIndexOf(list, undefined);

      // Adjust for the offset from the start of the results.
      start += section.start;

      return new Pride.Util.Section(start, end);
    }
  };

  var resultsPiece = function(section) {
    var output = [];

    for (var index = section.start; index <= section.end; index++) {
      output.push(results[index]);
    }

    return output;
  };

  ///////////////////
  // Observerables //
  ///////////////////

  var muted               = false;
  var observables         = [];
  var mutable_observables = [];

  this.clearAllObservers = function() {
    _.each(observables, function(observable) {
      observable.clearAll();
    });

    Pride.Util.safeCall(self.initialize_observables);

    return self;
  };

  this.getMute = function() {
    return muted;
  };

  this.setMute = function(state) {
    if (state != muted) {
      muted = state;
      Pride.Util.safeCall(self.muteChanged());

      if (!muted) {
        _.each(mutable_observables, function(observable) {
          observable.notify();
        });
      }
    }

    return self;
  };

  this.createObservable = function(name, data_func, never_mute) {
    var object = new Pride.Util.FuncBuffer(function() {
                   var add_observer   = this.add;
                   var call_observers = this.call;

                   observables.push(this);
                   if (!never_mute) mutable_observables.push(this);

                   this.add = function(func) {
                     if (!self.muted || never_mute) func(data_func());

                     add_observer(func, 'observers');

                     return this;
                   };

                   this.notify = function() {
                     if (!self.muted || never_mute) {
                       data = data_func();
                       self.log('NOTIFY (' + name + ')', data);

                       call_observers('observers', data);
                     }

                     return this;
                   };
                 });

    self[name + 'Changed']     = object.notify;
    parent[name + 'Observers'] = object;

    return self;
  };

  this.createObservable('mute',    this.getMute, true)
      .createObservable('setData', function() { parent.getData(); })
      .createObservable('runData', function() { parent.getData(); })
      .createObservable('results', this.results);

  ///////////////
  // UTILITIES //
  ///////////////

  parent.set = function(set_hash) {
    self.set(set_hash);

    return parent;
  };

  parent.run = function(cache_size) {
    self.run(cache_size);

    return parent;
  };

  parent.nextPage = function(cache_size) {
    var current_page = self.query.get('page');
    if (_.isNumber(current_page) && current_page < self.query.get('page_limit')) {
      parent.set({page: current_page + 1});
      parent.run(cache_size);
    }

    return parent;
  };

  parent.prevPage = function(cache_size) {
    var current_page = self.query.get('page');
    if (_.isNumber(current_page) && current_page > 1) {
      parent.set({page: current_page - 1});
      parent.run(cache_size);
    }

    return parent;
  };
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Util.SearchSwitcher = function(current_search, cached_searches) {
  var self         = this;
  var search_cache = new Pride.Util.MultiSearch(null, true, cached_searches);

  current_search.set({ page: 1 }).setMute(false);
  search_cache.set({ page: 1 });

  this.uid = current_search.uid;

  this.run = function(cache_size) {
    current_search.run(cache_size);
    search_cache.run(0);

    return self;
  };

  this.set = function(settings) {
    current_search.set(settings);
    search_cache.set(_.omit(settings, 'page', 'facets'));

    return self;
  };

  this.nextPage = function() {
    current_search.nextPage();

    return self;
  };

  this.prevPage = function() {
    current_search.prevPage();

    return self;
  };

  this.switchTo = function(requested_uid) {
    if (requested_uid != current_search) {
      current_search.setMute(true).set({ page: 1 });
      search_cache.searches.push(current_search);
      current_search = undefined;

      search_cache.searches = _.reject(
                                  search_cache.searches,
                                  function(search) {
                                    if (search.uid == requested_uid) {
                                      current_search = search;
                                      return true;
                                    }
                                  }
                                );

      if (!current_search) {
        throw 'Could not find a search with a UID of: ' + requested_uid;
      }


      self.uid = current_search.uid;
      current_search.setMute(false);
    }

    return self;
  };
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Util.Section = function(start, end) {
  this.start = Math.max(Math.min(start, end), 0);
  this.end   = Math.max(Math.max(start, end), 0);

  this.inSection = function(index) {
    return index >= this.start &&
           index <= this.end;
  };

  this.overlaps = function(section) {
    return this.inSection(section.start) ||
           this.inSection(section.end);
  };

  this.calcLength = function() {
    return this.end - this.start + 1;
  };

  this.expanded = function(amount) {
    return this.shifted(-1 * amount, amount);
  };

  this.shifted = function(start_amount, end_amount) {
    if (!_.isNumber(end_amount)) end_amount = start_amount;

    return new Pride.Util.Section(
             this.start + start_amount,
             this.end   + end_amount
           );
  };

  this.merge = function() {
    arguments.push(this);

    return new Pride.Util.Section(
             _.min(arguments, function(section) { return section.start; }),
             _.max(arguments, function(section) { return section.end;   })
           );
  };
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

// Perform a deep clone that leaves functions untouched.
Pride.Util.deepClone = function(original) {
  if (_.isFunction(original)) {
    return original;
  } else {
    collection_function = false;

    if (_.isArray(original)) {
      collection_function = 'map';
    } else if (_.isObject(original)){
      collection_function = 'mapObject';
    }

    if (collection_function) {
      return _[collection_function](
               original,
               function(item) { return Pride.Util.deepClone(item); }
             );
    } else {
      return _.clone(original);
    }
  }
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Util.escape = function(string) {
  var temp_element = document.createElement('div');
  temp_element.appendChild(document.createTextNode(string));

  return temp_element.innerHTML;
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.init = new Pride.Util.RequestBuffer({
  url:             function() { return Pride.Settings.datastores_url; },
  attempts:        function() { return Pride.Settings.init_attempts; },
  failure_message: function() { return Pride.Messenger.preset('failed_init'); },

  edit_response:   function() { return undefined; },
  before_success:  function(response) {
    Pride.AllDatastores.array = _.map(
      response['response'],
      function(datastore_data) {
        return new Pride.Core.Datastore(datastore_data);
      }
    );
  }
}).request;

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Util.isDeepMatch = function(object, pattern) {
  var both_arrays  = _.isArray(object)  && _.isArray(pattern);
  var both_objects = _.isObject(object) && _.isObject(pattern);

  if (both_arrays  && pattern.length != object.length) {
    return false;
  }

  if (both_objects && _.keys(pattern).length != _.keys(object).length) {
    return false;
  }

  if (both_arrays && both_objects) {
    return _.every(pattern, function(value, key) {
             return Pride.Util.isDeepMatch(object[key], value);
           });
  } else {
    return object === pattern;
  }
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

// Perform a deep clone that leaves functions untouched.
Pride.Core.log = function(source, info) {
  if (Pride.Settings.obnoxious) {
    var message = Pride.Util.slice(arguments, 2);
    message.unshift('[Pride: ' + source + '] ' + info);

    console.log.apply(console, message);
  }
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.FieldTree.parseField = function(field_name, content) {
  if (!content) {
    return {};
  } else {
    return new Pride.FieldTree.Field(
             field_name,
             new Pride.FieldTree.Literal(content)
           );
  }
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Util.request = function(request_info) {
  Pride.Core.log('Request', 'Sending HTTP request...');
  Pride.Core.log('Request', 'URL', request_info.url);
  Pride.Core.log('Request', 'CONTENT', JSON.stringify(request_info.query));

  if (!request_info.url) throw 'No URL given to Pride.Util.request()';

  var request_method = 'get';
  if (request_info.query) request_method = 'post';

  if (!_.isNumber(request_info.attempts)) {
    request_info.attempts = Pride.Settings.connection_attempts;
  }

  request_info.attempts -= 1;

  reqwest({
    url:             request_info.url,
    data:            JSON.stringify(request_info.query),
    type:            'json',
    method:          request_method,
    contentType:     'application/json',
    withCredentials: true,

    error: function (error) {
      if (request_info.attempts <= 0) {
        Pride.Core.log('Request', 'ERROR', error);

        Pride.Util.safeCall(request_info.failure, error);

        Pride.Messenger.sendMessage({
          summary: request_info.failure_message,
          class:   'error'
        });
      } else {
        Pride.Core.log('Request', 'Trying request again...');
        window.setTimeout(
          function() { Pride.Util.request(request_info); },
          Pride.Settings.ms_between_attempts
        );
      }
    },

    success: function (response) {
      Pride.Core.log('Request', 'SUCCESS', response);

      Pride.Util.safeCall(request_info.success, response);

      Pride.Messenger.sendMessage({
        summary: request_info.success_message,
        class:   'success'
      });

      Pride.Messenger.sendMessageArray(response.messages);
    }
  });
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Util.safeCall = function(maybe_func) {
  if (_.isFunction(maybe_func)) {
    return maybe_func.apply(this, Pride.Util.slice(arguments, 1));
  } else {
    return maybe_func;
  }
};

Pride.Util.safeApply = function(maybe_func, args) {
  if (_.isFunction(maybe_func)) {
    return maybe_func.apply(this, args);
  } else {
    return maybe_func;
  }
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Util.slice = function(array, begin, end) {
  return Array.prototype.slice.call(array, begin, end);
};

// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.AllDatastores = {
  array: [],

  newSearch: function(uid) {
    var datastore = _.find(
                      this.array,
                      function(datastore) { return datastore.get('uid') == uid; }
                    );

    return datastore ? datastore.baseSearch() : undefined;
  },

  each: function(func) {
    _.each(this.array, func);

    return this;
  }
};


// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Messenger = new Pride.Util.FuncBuffer(function() {
  var notifyObservers = this.call;

  this.addObserver    = this.add;
  this.removeObserver = this.remove;
  this.clearObservers = this.clear;

  this.call   = undefined;
  this.add    = undefined;
  this.remove = undefined;
  this.clear  = undefined;

  this.sendMessage = function(message) {
    // if (message['summary']) {
    //   message['class']   = message['class']   || 'info';
    //   message['details'] = message['details'] || '';

    //   notifyObservers(message);

    //   Pride.Core.log('Messenger', 'MESSAGE SENT', message);
    // }

    // return this;
  };

  this.sendMessageArray = function(message_array) {
    // var messenger = this;

    // _.each(
    //   message_array,
    //   function(message) { messenger.sendMessage(message); }
    // );

    // return this;
  };

  // Given a type of preset message and some optional arguments, generate a
  // message string.
  this.preset = function(type) {
    // var variables = Pride.Util.slice(arguments);

    // return Pride.Settings
    //             .message_formats[type]
    //             .replace(
    //               /(^|[^\\])\$(\d+)/,
    //               function(match, previous_char, number) {
    //                 return previous_char + (variables[Number(number)] || '');
    //               }
    //             )
    //             .replace('\\$', '$');
  };
});
