/* eslint 'camelcase': 'off' */
const testData = [
  {
    author: 'Van Horn, Michele Ann.',
    call_number: 'QL 671 .B645 no.88',
    date: '1994',
    title: 'Ovenbird : Seiurus aurocapillus / M.A. Van Horn and T.M. Donovan.',
    url: 'https://search.lib.umich.edu/catalog/record/990028850960106381'
  },
  {
    author: 'Limpert, Roland J., 1952-',
    call_number: 'QL 671 .B645 no.89',
    date: '1994',
    title: 'Tundra swan : Cygnus columbianus / R.J. Limpert and S.L. Earnst.',
    url: 'https://search.lib.umich.edu/catalog/record/990028851500106381'
  },
  {
    author: 'Kushlan, James A. (James Anthony), 1947-',
    call_number: 'QL 671 .B645 no.9',
    date: '1992',
    title: 'White ibis : Eudocimus albus / James A. Kushlan and Keith L. Bildstein.',
    url: 'https://search.lib.umich.edu/catalog/record/990058872910106381'
  },
  {
    author: 'Wilson, W. Herbert, Jr.',
    call_number: 'QL 671 .B645 no.90',
    date: '1994',
    title: 'Western sandpiper : Calidris mauri / W. Herbert Wilson.',
    url: 'https://search.lib.umich.edu/catalog/record/990028851490106381'
  },
  {
    author: 'Lanctot, Richard B.',
    call_number: 'QL 671 .B645 no.91',
    date: '1994',
    title: 'Buff-breasted sandpiper : Tryngites subruficollis / R.B. Lanctot and C.D. Laredo.',
    url: 'https://search.lib.umich.edu/catalog/record/990028851510106381'
  },
  {
    author: 'Baird, Pat Herron.',
    call_number: 'QL 671 .B645 no.92',
    date: '1994',
    title: 'Black-legged kittiwake : Rissa tridactyla / Pat Herron Baird.',
    url: 'https://search.lib.umich.edu/catalog/record/990028851480106381'
  },
  {
    author: 'McCallum, D. Archibald.',
    call_number: 'QL 671 .B645 no.93',
    date: '1994',
    title: 'Flammulated owl : Otus flammeolus / D. Archibald McCallum.',
    url: 'https://search.lib.umich.edu/catalog/record/990028851470106381'
  },
  {
    author: 'Weeks, Harmon P., Jr., 1944-',
    call_number: 'QL 671 .B645 no.94',
    date: '1994',
    title: 'Eastern phoebe : Sayornis phoebe / Harmon P. Weeks, Jr.',
    url: 'https://search.lib.umich.edu/catalog/record/990028851450106381'
  },
  {
    author: 'Verbeek, Nicolaas A. M.',
    call_number: 'QL 671 .B645 no.95',
    date: '1994',
    title: 'American pipit : Anthus rubescens / N.A.M Verbeek and P. Hendricks.',
    url: 'https://search.lib.umich.edu/catalog/record/990028851610106381'
  },
  {
    author: 'With, Kimberly A.',
    call_number: 'QL 671 .B645 no.96',
    date: '1994',
    title: 'McCown\'s longspur : Calcarius mccownii / Kimberly A. With.',
    url: 'https://search.lib.umich.edu/catalog/record/990028851620106381'
  },
  {
    author: 'Petersen, Margaret R.',
    call_number: 'QL 671 .B645 no.97',
    date: '1994',
    title: 'Emperor goose : Chen canagica / M.R. Petersen, J.A. Schmutz, and R.F. Rockwell.',
    url: 'https://search.lib.umich.edu/catalog/record/990029058810106381'
  },
  {
    author: 'Dugger, Bruce D. (Bruce David), 1964-',
    call_number: 'QL 671 .B645 no.98',
    date: '1994',
    title: 'Hooded merganser : Lophodytes cucullatus / B.D. Dugger, K.M. Dugger, and L.H. Fredrickson.',
    url: 'https://search.lib.umich.edu/catalog/record/990029058820106381'
  },
  {
    author: 'Briskie, James V.',
    call_number: 'QL 671 .B645 no.99',
    date: '1994',
    title: 'Least flycatcher : Empidonax minimus / James V. Briskie.',
    url: 'https://search.lib.umich.edu/catalog/record/990029058830106381'
  },
  {
    author: null,
    call_number: 'QL 671 .B65',
    date: '20th century (exact date unknown)',
    title: 'Birds of prey bulletin / World Working Group on Birds of Prey and Owls, of the International Council for Bird Preservation = Greifvogel-Bulletin / Weltarbeitsgruppe für Greifvögel und Eulen des Internationalen Rates für Vogelschutz = Bulletin rapaces / Groupe de travail mondial sur les rapaces du Conseil international pour la protection des oiseaux.',
    url: 'https://search.lib.umich.edu/catalog/record/990030852150106381'
  },
  {
    author: null,
    call_number: 'QL671 .B652',
    date: '1900-1901',
    title: 'The Bittern : A bi-monthly magazine devoted exclusively to ornithology and oology.',
    url: 'https://search.lib.umich.edu/catalog/record/990006759020106381'
  },
  {
    author: null,
    call_number: 'QL 671 .B652',
    date: '1900-1901',
    title: 'The Bittern, [A bi-monthly magazine devoted exclusively to ornithology and oology] v.1, no.1-3, June-Oct. 1900; v.1, no. 1, Jan. 1901.',
    url: 'https://search.lib.umich.edu/catalog/record/990020150510106381'
  },
  {
    author: null,
    call_number: 'QL671 .B653',
    date: '1890-1891',
    title: 'The Bittern.',
    url: 'https://search.lib.umich.edu/catalog/record/990006759030106381'
  },
  {
    author: null,
    call_number: 'QL 671 .B655',
    date: '1990-',
    title: 'Blätter aus dem Naumann-Museum.',
    url: 'https://search.lib.umich.edu/catalog/record/990035617640106381'
  },
  {
    author: null,
    call_number: 'QL671 .B656',
    date: '1910-1920',
    title: 'Blue bird.',
    url: 'https://search.lib.umich.edu/catalog/record/990006363030106381'
  },
  {
    author: null,
    call_number: 'QL671 .B658',
    date: '1943-',
    title: 'Blue jay.',
    url: 'https://search.lib.umich.edu/catalog/record/990004962230106381'
  },
  {
    author: null,
    call_number: 'QL671 .B66',
    date: '1934-',
    title: 'The Bluebird.',
    url: 'https://search.lib.umich.edu/catalog/record/990000560340106381'
  },
  {
    author: null,
    call_number: 'QL 671 .B67',
    date: '1903-1965',
    title: 'Bird notes.',
    url: 'https://search.lib.umich.edu/catalog/record/990005469460106381'
  },
  {
    author: null,
    call_number: 'QL671 .B678',
    date: '1966-2013',
    title: 'Birds.',
    url: 'https://search.lib.umich.edu/catalog/record/990006758990106381'
  },
  {
    author: null,
    call_number: 'QL671 .B6781',
    date: '2013-',
    title: 'Nature\'s home : the RSPB magazine.',
    url: 'https://search.lib.umich.edu/catalog/record/990129583230106381'
  },
  {
    author: null,
    call_number: 'QL671 .B688',
    date: '1902-1925',
    title: 'Bird notes.',
    url: 'https://search.lib.umich.edu/catalog/record/11012368819'
  },
  {
    author: null,
    call_number: 'QL671 .B688',
    date: '1902-1925',
    title: 'Bird notes.',
    url: 'https://search.lib.umich.edu/catalog/record/990123688190106381'
  },
  {
    author: 'Marle, J. G. van (John G.), 1901-1979.',
    call_number: 'QL 671 .B692 no.10',
    date: '1988',
    title: 'The birds of Sumatra : an annotated check-list / by J. G. van Marle & Karel H. Voous ; in cooperation with Geoffrey W.H. Davison & David R. Wells.',
    url: 'https://search.lib.umich.edu/catalog/record/990035390150106381'
  },
  {
    author: 'Dickinson, Edward C.',
    call_number: 'QL 671 .B692 no.12',
    date: '1991',
    title: 'The birds of the Philippines : an annotated check-list / by Edward C. Dickinson, Robert S. Kennedy & Kenneth C. Parkes ; with maps by Emily McGowan.',
    url: 'https://search.lib.umich.edu/catalog/record/990035390340106381'
  },
  {
    author: 'Grimes, L. G.',
    call_number: 'QL 671 .B692 no.9',
    date: '1987',
    title: 'The birds of Ghana : an annotated check-list / by L.G. Grimes.',
    url: 'https://search.lib.umich.edu/catalog/record/990035390120106381'
  },
  {
    author: null,
    call_number: 'QL671 .B7',
    date: '1892-2016',
    title: 'Bulletin of the British Ornithologists\' Club.',
    url: 'https://search.lib.umich.edu/catalog/record/99187300251406381'
  },
  {
    author: null,
    call_number: 'QL 671 .B73',
    date: '1989-1995',
    title: 'Birding in southern Africa.',
    url: 'https://search.lib.umich.edu/catalog/record/990021668240106381'
  },
  {
    author: null,
    call_number: 'QL671 .B73',
    date: '1948-1989',
    title: 'Bokmakierie; a popular magazine for bird watchers.',
    url: 'https://search.lib.umich.edu/catalog/record/990005236610106381'
  },
  {
    author: null,
    call_number: 'QL 671 .B883211 1992',
    date: '1992',
    title: 'Birds, discovery, and conservation : 100 years of the Bulletin of the British Ornithologists\'s Club / edited by David Snow.',
    url: 'https://search.lib.umich.edu/catalog/record/990026496800106381'
  },
  {
    author: null,
    call_number: 'QL 671 .B8869',
    date: '1996-',
    title: 'Birdwatch Canada.',
    url: 'https://search.lib.umich.edu/catalog/record/990069595420106381'
  },
  {
    author: null,
    call_number: 'QL 671 .B89',
    date: '1990-',
    title: 'Britain\'s birds in ...',
    url: 'https://search.lib.umich.edu/catalog/record/990029783620106381'
  },
  {
    author: null,
    call_number: 'QL 671 .B9',
    date: '1907-',
    title: 'British birds : an illustrated magazine devoted to the birds on the British list.',
    url: 'https://search.lib.umich.edu/catalog/record/990005065120106381'
  },
  {
    author: null,
    call_number: 'QL 671 .B9 1907-1919',
    date: '1922',
    title: 'British birds. An illustrated magazine devoted chiefly to the birds on the British list. ... Index to volumes I.-XII. [1907-1919.]',
    url: 'https://search.lib.umich.edu/catalog/record/990020150560106381'
  },
  {
    author: null,
    call_number: 'QL 671 .B93',
    date: '1991-',
    title: 'British Columbia birds : journal of British Columbia Field Ornithologists.',
    url: 'https://search.lib.umich.edu/catalog/record/990031797130106381'
  },
  {
    author: 'British Ornithologists\' Club.',
    call_number: 'QL 671 .B96 A3',
    date: '1892-',
    title: 'Bulletin of the British Ornithologists\' Club.',
    url: 'https://search.lib.umich.edu/catalog/record/990006418930106381'
  },
  {
    author: null,
    call_number: 'QL 671 .B96 A3 v.112A',
    date: '1992',
    title: 'Avian systematics and taxonomy / edited by J.F. Monk.',
    url: 'https://search.lib.umich.edu/catalog/record/990030751650106381'
  },
  {
    author: null,
    call_number: 'QL 671 .B962',
    date: '1976-',
    title: 'B.O.U. check-list.',
    url: 'https://search.lib.umich.edu/catalog/record/990000452310106381'
  },
  {
    author: 'Bundy, Graham.',
    call_number: 'QL 671 .B962 no.1',
    date: '1976',
    title: 'The birds of Libya : an annotated check-list / Graham Bundy.',
    url: 'https://search.lib.umich.edu/catalog/record/990035389730106381'
  },
  {
    author: 'Iapichino, Carmelo.',
    call_number: 'QL 671 .B962 no.11',
    date: '1989',
    title: 'The birds of Sicily : an annotated check-list / by Carmelo Iapichino & Bruno Massa.',
    url: 'https://search.lib.umich.edu/catalog/record/990035390280106381'
  },
  {
    author: 'Hazevoet, Cornelis J.',
    call_number: 'QL 671 .B962 no.13',
    date: '1995',
    title: 'The birds of the Cape Verde Islands : an annotated check-list / by Cornelis J. Hazevoet.',
    url: 'https://search.lib.umich.edu/catalog/record/990035390570106381'
  },
  {
    author: 'Cheke, Robert A.',
    call_number: 'QL 671 .B962 no.14',
    date: '1996',
    title: 'The birds of Togo : an annotated check-list / by Robert A. Cheke & J. Frank Walsh.',
    url: 'https://search.lib.umich.edu/catalog/record/990035390670106381'
  }
];

export default testData;
