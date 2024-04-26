const relatedItems = [];

const generateObject = (id, title, author, callnumber, year) => {
  return relatedItems.push([
    {
      uid: 'id',
      name: 'ID',
      value: id
    },
    {
      uid: 'title',
      name: 'Title',
      value: [title]
    },
    {
      uid: 'author',
      name: 'Author',
      value: [author]
    },
    {
      uid: 'callnumber_browse',
      name: 'Call Number',
      value: [callnumber]
    },
    {
      uid: 'published_year',
      name: 'Published Year',
      value: [year]
    }
  ]);
};

// generateObject('990028850940106381', 'Tufted titmouse : Parus bicolor / T.C. Grubb, Jr., and V.V. Pravosudov.', 'Grubb, Thomas C', 'QL 671 .B645 no.86', '1994');
// generateObject('990028850950106381', 'Black-throated blue warbler : Dendroica caerulescens / Richard T. Holmes.', 'Holmes, Richard Turner', 'QL 671 .B645 no.87', '1994');
//
generateObject('990028850960106381', 'Ovenbird : Seiurus aurocapillus / M.A. Van Horn and T.M. Donovan.', 'Van Horn, Michele Ann', 'QL 671 .B645 no.88', '1994');
generateObject('990028851500106381', 'Tundra swan : Cygnus columbianus / R.J. Limpert and S.L. Earnst.', 'Limpert, Roland J.', 'QL 671 .B645 no.89', '1994');
generateObject('990058872910106381', 'White ibis : Eudocimus albus / James A. Kushlan and Keith L. Bildstein.', 'Kushlan, James A. (James Anthony)', 'QL 671 .B645 no.9', '1994');
generateObject('990028851490106381', 'Western sandpiper : Calidris mauri / W. Herbert Wilson.', 'Wilson, W. Herbert, Jr', 'QL 671 .B645 no.90', '1994');
generateObject('990028851510106381', 'Buff-breasted sandpiper : Tryngites subruficollis / R.B. Lanctot and C.D. Laredo.', 'Lanctot, Richard B', 'QL 671 .B645 no.91', '1994');
//
generateObject('990028851480106381', 'Black-legged kittiwake : Rissa tridactyla / Pat Herron Baird.', 'Baird, Pat Herron', 'QL 671 .B645 no.92', '1994');
generateObject('990028851470106381', 'Flammulated owl : Otus flammeolus / D. Archibald McCallum.', 'McCallum, D. Archibald', 'QL 671 .B645 no.93', '1994');
generateObject('990028851450106381', 'Eastern phoebe : Sayornis phoebe / Harmon P. Weeks, Jr.', 'Weeks, Harmon P., Jr.', 'QL 671 .B645 no.94', '1994');
generateObject('990028851610106381', 'American pipit : Anthus rubescens / N.A.M Verbeek and P. Hendricks.', 'Verbeek, Nicolaas A. M', 'QL 671 .B645 no.95', '1994');
generateObject('990028851620106381', "McCown's longspur : Calcarius mccownii / Kimberly A. With.", 'With, Kimberly A', 'QL 671 .B645 no.96', '1994');
//
generateObject('990029058810106381', 'Emperor goose : Chen canagica / M.R. Petersen, J.A. Schmutz, and R.F. Rockwell.', 'Petersen, Margaret R', 'QL 671 .B645 no.97', '1994');
generateObject('990029058820106381', 'Hooded merganser : Lophodytes cucullatus / B.D. Dugger, K.M. Dugger, and L.H. Fredrickson.', 'Dugger, Bruce D. (Bruce David)', 'QL 671 .B645 no.98', '1994');
generateObject('990029058830106381', 'Least flycatcher : Empidonax minimus / James V. Briskie.', 'Briskie, James V', 'QL 671 .B645 no.99', '1994');
generateObject('990030852150106381', 'Birds of prey bulletin / World Working Group on Birds of Prey and Owls, of the International Council for Bird Preservation = Greifvogel-Bulletin / Weltarbeitsgruppe für Greifvögel und Eulen des Internationalen Rates für Vogelschutz = Bulletin rapaces / Groupe de travail mondial sur les rapaces du Conseil international pour la protection des oiseaux.', 'Berlin, Germany : The Working Group', 'QL 671 .B65', '');
generateObject('990006759020106381', 'The Bittern : A bi-monthly magazine devoted exclusively to ornithology and oology.', 'Cedar Rapids, Ia : G. M. Hathorn', 'QL671 .B652', '1900-1901');
//
generateObject('990020150510106381', 'The Bittern, [A bi-monthly magazine devoted exclusively to ornithology and oology] v.1, no.1-3, June-Oct. 1900; v.1, no. 1, Jan. 1901.', 'Cedar Rapids, Ia., G.M. Hathorn', 'QL 671 .B652', '1900-01');
generateObject('990006759030106381', 'The Bittern.', 'Damariscotta, Me., H. E. Berry; Canisteo, N. Y., C. W. Hillman', 'QL671 .B653', '');
generateObject('990035617640106381', 'Blätter aus dem Naumann-Museum.', 'Köthen : Naumann-Museum', 'QL 671 .B655', '1990');
generateObject('990006363030106381', 'Blue bird.', 'Cleveland, Cincinnati : Cleveland Bird Lovers Association', 'QL671 .B656', '');
generateObject('990004962230106381', 'Blue jay.', 'Regina, Saskatchewan Natural History Society', 'QL671 .B658', '');
//
generateObject('990000560340106381', 'The Bluebird.', 'St. Louis, Missouri Audubon Society', 'QL671 .B66', '');
generateObject('990005469460106381', 'Bird notes.', 'Sandy, Bedfordshire, Eng. [etc.] : Royal Society for the Protection of Birds', 'QL 671 .B67', '');
// MIDDLE
generateObject('990006758990106381', 'Birds.', 'Royal Society for the Protection of Birds', 'QL671 .B678', '1966');
// MIDDLE
generateObject('990129583230106381', "Nature's home : the RSPB magazine.", 'Sandy, Bedfordshire : RSPB', 'QL671 .B6781', '2013');
generateObject('11012368819', 'Bird notes.', 'Sandy, Bedfordshire', 'QL671 .B688', '1902-1925');
//
generateObject('990123688190106381', 'Bird notes.', 'Brighton : Foreign Bird Club : National British Bird and Mule Club', 'QL671 .B688', '1902-1925');
generateObject('990035390150106381', 'The birds of Sumatra : an annotated check-list / by J. G. van Marle & Karel H. Voous ; in cooperation with Geoffrey W.H. Davison & David R. Wells.', 'Marle, J. G. van (John G.)', 'QL 671 .B692 no.10', '1988');
generateObject('990035390340106381', 'The birds of the Philippines : an annotated check-list / by Edward C. Dickinson, Robert S. Kennedy & Kenneth C. Parkes ; with maps by Emily McGowan.', 'Dickinson, Edward C.', 'QL 671 .B692 no.12', '1991');
generateObject('990035390120106381', 'The birds of Ghana : an annotated check-list / by L.G. Grimes.', 'Grimes, L. G.', 'QL 671 .B692 no.9', '1987');
generateObject('99187300251406381', "Bulletin of the British Ornithologists' Club.", "British Ornithologists' Club", 'QL671 .B7', '1892');
//
generateObject('990005236610106381', 'Bokmakierie; a popular magazine for bird watchers.', 'Johannesburg, South African Ornithological Society', 'QL671 .B73', '1948');
generateObject('990021668240106381', 'Birding in southern Africa.', 'Johannesburg : Southern African Ornithological Society', 'QL 671 .B73', '1989-c1995');
generateObject('11009209669', 'Annual report of the British Trust for Ornithology.', 'British Trust for Ornithology.', 'QL671 .B83', '');
generateObject('11009210198', 'Annual report and accounts - British Trust for Ornithology.', 'British Trust for Ornithology', 'QL671 .B8322', '');
generateObject('990026496800106381', "Birds, discovery, and conservation : 100 years of the Bulletin of the British Ornithologists's Club / edited by David Snow.", 'Mountfield, East Sussex : Helm Information Ltd.', 'QL 671 .B883211 1992', '1992');
//
generateObject('990069595420106381', 'Birdwatch Canada.', 'Port Rowan, Ont. : Bird Studies Canada', 'QL 671 .B8869', '1996');
generateObject('990029783620106381', "Britain's birds in ...", 'Peterborough [England] : Nature Conservancy Council ; Thetford, Norfolk [England] : British Trust for Ornithology', 'QL 671 .B89', '1991');
generateObject('990005065120106381', 'British birds : an illustrated magazine devoted to the birds on the British list.', 'London : Witherby & co.', 'QL 671 .B9', '1907');
generateObject('990020150560106381', 'British birds. An illustrated magazine devoted chiefly to the birds on the British list. ... Index to volumes I.-XII. [1907-1919.]', 'London, H. F. & G. Witherby', 'QL 671 .B9 1907-1919', '1922');
generateObject('990031797130106381', 'British Columbia birds : journal of British Columbia Field Ornithologists.', 'Surrey, B.C. : The Ornithologists', 'QL 671 .B93', '1993');
//
generateObject('11009209495', 'The Bullbird.', "St. John's, Nfld. : B. Mactavish", 'QL671 .B935', '');
generateObject('990006418930106381', "Bulletin of the British Ornithologists' Club.", "British Ornithologists' Club", 'QL 671 .B96 A3', '1892');
generateObject('990030751650106381', 'Avian systematics and taxonomy / edited by J.F. Monk.', "[S.l.] : British Ornithologists' Club,", 'QL 671 .B96 A3 v.112A', '1992');
generateObject('990000452310106381', 'B.O.U. check-list.', "London : British Ornithologists' Union", 'QL 671 .B962', '1976');
generateObject('990035389730106381', 'The birds of Libya : an annotated check-list / Graham Bundy.', 'Bundy, Graham', 'QL 671 .B962 no.1', '1976');
//
// generateObject('990035390280106381', 'The birds of Sicily : an annotated check-list / by Carmelo Iapichino & Bruno Massa.', 'Iapichino, Carmelo', 'QL 671 .B962 no.11', '1989');
// generateObject('990035390570106381', 'The birds of the Cape Verde Islands : an annotated check-list / by Cornelis J. Hazevoet. 1st ed.', 'Hazevoet, Cornelis J', 'QL 671 .B962 no.13', '1995');

export default relatedItems;
