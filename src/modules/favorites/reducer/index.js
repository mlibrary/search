import * as actions from '../actions';
import _ from 'underscore'

const favoritesReducer = (state = { disabled: false }, action) => {
  if (action.payload) {
    const {
      recordUid,
      datastoreUid,
      tag
    } = action.payload

    switch (action.type) {
      case actions.FAVORITE:
        favoritesHotJarTracking(action.type)

        return {
          ...state,
          [datastoreUid]: {
            ...state[datastoreUid],
            [recordUid]: {
              favorited: true,
              tags: undefined,
              untags: undefined
            }
          }
        }
      case actions.UNFAVORITE:
        favoritesHotJarTracking(action.type)
        
        return {
          ...state,
          [datastoreUid]: {
            ...state[datastoreUid],
            [recordUid]: {
              favorited: false,
              tags: undefined,
              untags: undefined
            }
          }
        }
      case actions.TAG_FAVORITE:
        favoritesHotJarTracking(action.type)

        if (true) {
          let tags = 
            state[datastoreUid] &&
            state[datastoreUid][recordUid] && 
            state[datastoreUid][recordUid].tags ?
            [...state[datastoreUid][recordUid].tags, tag] : [tag]
          
          let untags =
            state[datastoreUid] &&
            state[datastoreUid][recordUid] && 
            state[datastoreUid][recordUid].untags ? 
            state[datastoreUid][recordUid].untags : undefined
            
          return {
            ...state,
            [datastoreUid]: {
              ...state[datastoreUid],
              [recordUid]: {
                tags: tags ? _.flatten(tags) : undefined,
                untags,
                favorited: true
              }
            }
          }
        }
        break;
      case actions.UNTAG_FAVORITE:
        favoritesHotJarTracking(action.type)

        if (true) { // adding a scope to the vars
          let tags = 
            state[datastoreUid] &&
            state[datastoreUid][recordUid] && 
            state[datastoreUid][recordUid].tags ?
            [state[datastoreUid][recordUid].tags.filter(t =>
              t.toLowerCase() !== tag.toLowerCase()
            )] : undefined

          let untags = 
            state[datastoreUid] &&
            state[datastoreUid][recordUid] && 
            state[datastoreUid][recordUid].untags ?
            [...state[datastoreUid][recordUid].untags, tag] : [tag]
            
          let favorited =
            state[datastoreUid] &&
            state[datastoreUid][recordUid] && 
            state[datastoreUid][recordUid].favorited ? 
            state[datastoreUid][recordUid].favorited : undefined

          return {
            ...state,
            [datastoreUid]: {
              ...state[datastoreUid],
              [recordUid]: {
                tags: tags ? _.flatten(tags) : undefined,
                untags: untags ? untags : undefined,
                favorited
              }
            }
          }
        }
        break;
      default:
        return state
    }
  }

  return state
}

function favoritesHotJarTracking(action_type) {
  try {
    window.hj('favorites', action_type)
  } catch {
    console.log('Unable to track user action with HotJar', action_type)
  }
}

export default favoritesReducer
