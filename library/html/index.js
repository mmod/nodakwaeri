/**
 * package: nodakwaeri
 * sub-package: html
 * author:  Richard B. Winters <a href='mailto:rik@mmogp.com'>Rik At MMOGP</a>
 * copyright: 2011-2015 Massively Modified, Inc.
 * license: Apache, Version 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */


/**
 * Defining the rendering tools component
 *
 * @since 0.0.1
 */
module.exports = exports = html;

function html( config )
{
    html.prototype.nk = config;
};

html.prototype._classmap =
{
    label: "col-md-2 control-label",
    textbox: "form-control",
    password: "form-control",
    textarea: "form-control",
    select: "form-control",
    multiselect: "form-control",
    checkbox: "",
    slider: "form-control",
    radio: "form-control",
    button: "btn ",
    submit: "btn ",
    validationmessage: ""
};

html.prototype._version = function()
{
    return String( "0.0.5-alpha" );
};

html.prototype._formlists =
{
    countries:
    [
        { numerical: "004", name: "Afghanistan", isoalpha3: "AFG" },
        { numerical: "248", name: "Åland Islands", isoalpha3: "ALA" },
        { numerical: "008", name: "Albania", isoalpha3: "ALB" },
        { numerical: "012", name: "Algeria", isoalpha3: "DZA" },
        { numerical: "016", name: "American Samoa", isoalpha3: "ASM" },
        { numerical: "020", name: "Andorra", isoalpha3: "AND" },
        { numerical: "024", name: "Angola", isoalpha3: "AGO" },
        { numerical: "660", name: "Anguilla", isoalpha3: "AIA" },
        { numerical: "028", name: "Antigua and Barbuda", isoalpha3: "ATG" },
        { numerical: "032", name: "Argentina", isoalpha3: "ARG" },
        { numerical: "051", name: "Armenia", isoalpha3: "ARM" },
        { numerical: "533", name: "Aruba", isoalpha3: "ABW" },
        { numerical: "036", name: "Australia", isoalpha3: "AUS" },
        { numerical: "040", name: "Austria", isoalpha3: "AUT" },
        { numerical: "031", name: "Azerbaijan", isoalpha3: "AZE" },
        { numerical: "044", name: "Bahamas", isoalpha3: "BHS" },
        { numerical: "048", name: "Bahrain", isoalpha3: "BHR" },
        { numerical: "050", name: "Bangladesh", isoalpha3: "BGD" },
        { numerical: "052", name: "Barbados", isoalpha3: "BRB" },
        { numerical: "112", name: "Belarus", isoalpha3: "BLR" },
        { numerical: "056", name: "Belgium", isoalpha3: "BEL" },
        { numerical: "084", name: "Belize", isoalpha3: "BLZ" },
        { numerical: "204", name: "Benin", isoalpha3: "BEN" },
        { numerical: "060", name: "Bermuda", isoalpha3: "BMU" },
        { numerical: "064", name: "Bhutan", isoalpha3: "BTN" },
        { numerical: "068", name: "Bolivia (Plurinational State of)", isoalpha3: "BOL" },
        { numerical: "535", name: "Bonaire, Saint Eustatius and Saba", isoalpha3: "BES" },
        { numerical: "070", name: "Bosnia and Herzegovina", isoalpha3: "BIH" },
        { numerical: "072", name: "Botswana", isoalpha3: "BWA" },
        { numerical: "076", name: "Brazil", isoalpha3: "BRA" },
        { numerical: "092", name: "British Virgin Islands", isoalpha3: "VGB" },
        { numerical: "096", name: "Brunei Darussalam", isoalpha3: "BRN" },
        { numerical: "100", name: "Bulgaria", isoalpha3: "BGR" },
        { numerical: "854", name: "Burkina Faso", isoalpha3: "BFA" },
        { numerical: "108", name: "Burundi", isoalpha3: "BDI" },
        { numerical: "132", name: "Cabo Verde", isoalpha3: "CPV" },
        { numerical: "116", name: "Cambodia", isoalpha3: "KHM" },
        { numerical: "120", name: "Cameroon", isoalpha3: "CMR" },
        { numerical: "124", name: "Canada", isoalpha3: "CAN" },
        { numerical: "136", name: "Cayman Islands", isoalpha3: "CYM" },
        { numerical: "140", name: "Central African Republic", isoalpha3: "CAF" },
        { numerical: "148", name: "Chad", isoalpha3: "TCD" },
        { numerical: "830", name: "Channel Islands", isoalpha3: "" },
        { numerical: "152", name: "Chile", isoalpha3: "CHL" },
        { numerical: "156", name: "China", isoalpha3: "CHN" },
        { numerical: "344", name: "China, Hong Kong Special Administrative Region", isoalpha3: "HKG" },
        { numerical: "446", name: "China, Macao Special Administrative Region", isoalpha3: "MAC" },
        { numerical: "170", name: "Colombia", isoalpha3: "COL" },
        { numerical: "174", name: "Comoros", isoalpha3: "COM" },
        { numerical: "178", name: "Congo", isoalpha3: "COG" },
        { numerical: "184", name: "Cook Islands", isoalpha3: "COK" },
        { numerical: "188", name: "Costa Rica", isoalpha3: "CRI" },
        { numerical: "384", name: "Côte d'Ivoire", isoalpha3: "CIV" },
        { numerical: "191", name: "Croatia", isoalpha3: "HRV" },
        { numerical: "192", name: "Cuba", isoalpha3: "CUB" },
        { numerical: "531", name: "Curaçao", isoalpha3: "CUW" },
        { numerical: "196", name: "Cyprus", isoalpha3: "CYP" },
        { numerical: "203", name: "Czech Republic", isoalpha3: "CZE" },
        { numerical: "408", name: "Democratic People's Republic of Korea", isoalpha3: "PRK" },
        { numerical: "180", name: "Democratic Republic of the Congo", isoalpha3: "COD" },
        { numerical: "208", name: "Denmark", isoalpha3: "DNK" },
        { numerical: "262", name: "Djibouti", isoalpha3: "DJI" },
        { numerical: "212", name: "Dominica", isoalpha3: "DMA" },
        { numerical: "214", name: "Dominican Republic", isoalpha3: "DOM" },
        { numerical: "218", name: "Ecuador", isoalpha3: "ECU" },
        { numerical: "818", name: "Egypt", isoalpha3: "EGY" },
        { numerical: "222", name: "El Salvador", isoalpha3: "SLV" },
        { numerical: "226", name: "Equatorial Guinea", isoalpha3: "GNQ" },
        { numerical: "232", name: "Eritrea", isoalpha3: "ERI" },
        { numerical: "233", name: "Estonia", isoalpha3: "EST" },
        { numerical: "231", name: "Ethiopia", isoalpha3: "ETH" },
        { numerical: "234", name: "Faeroe Islands", isoalpha3: "FRO" },
        { numerical: "238", name: "Falkland Islands (Malvinas)", isoalpha3: "FLK" },
        { numerical: "242", name: "Fiji", isoalpha3: "FJI" },
        { numerical: "246", name: "Finland", isoalpha3: "FIN" },
        { numerical: "250", name: "France", isoalpha3: "FRA" },
        { numerical: "254", name: "French Guiana", isoalpha3: "GUF" },
        { numerical: "258", name: "French Polynesia", isoalpha3: "PYF" },
        { numerical: "266", name: "Gabon", isoalpha3: "GAB" },
        { numerical: "270", name: "Gambia", isoalpha3: "GMB" },
        { numerical: "268", name: "Georgia", isoalpha3: "GEO" },
        { numerical: "276", name: "Germany", isoalpha3: "DEU" },
        { numerical: "288", name: "Ghana", isoalpha3: "GHA" },
        { numerical: "292", name: "Gibraltar", isoalpha3: "GIB" },
        { numerical: "300", name: "Greece", isoalpha3: "GRC" },
        { numerical: "304", name: "Greenland", isoalpha3: "GRL" },
        { numerical: "308", name: "Grenada", isoalpha3: "GRD" },
        { numerical: "312", name: "Guadeloupe", isoalpha3: "GLP" },
        { numerical: "316", name: "Guam", isoalpha3: "GUM" },
        { numerical: "320", name: "Guatemala", isoalpha3: "GTM" },
        { numerical: "831", name: "Guernsey", isoalpha3: "GGY" },
        { numerical: "324", name: "Guinea", isoalpha3: "GIN" },
        { numerical: "624", name: "Guinea-Bissau", isoalpha3: "GNB" },
        { numerical: "328", name: "Guyana", isoalpha3: "GUY" },
        { numerical: "332", name: "Haiti", isoalpha3: "HTI" },
        { numerical: "336", name: "Holy See", isoalpha3: "VAT" },
        { numerical: "340", name: "Honduras", isoalpha3: "HND" },
        { numerical: "348", name: "Hungary", isoalpha3: "HUN" },
        { numerical: "352", name: "Iceland", isoalpha3: "ISL" },
        { numerical: "356", name: "India", isoalpha3: "IND" },
        { numerical: "360", name: "Indonesia", isoalpha3: "IDN" },
        { numerical: "364", name: "Iran (Islamic Republic of)", isoalpha3: "IRN" },
        { numerical: "368", name: "Iraq", isoalpha3: "IRQ" },
        { numerical: "372", name: "Ireland", isoalpha3: "IRL" },
        { numerical: "833", name: "Isle of Man", isoalpha3: "IMN" },
        { numerical: "376", name: "Israel", isoalpha3: "ISR" },
        { numerical: "380", name: "Italy", isoalpha3: "ITA" },
        { numerical: "388", name: "Jamaica", isoalpha3: "JAM" },
        { numerical: "392", name: "Japan", isoalpha3: "JPN" },
        { numerical: "832", name: "Jersey", isoalpha3: "JEY" },
        { numerical: "400", name: "Jordan", isoalpha3: "JOR" },
        { numerical: "398", name: "Kazakhstan", isoalpha3: "KAZ" },
        { numerical: "404", name: "Kenya", isoalpha3: "KEN" },
        { numerical: "296", name: "Kiribati", isoalpha3: "KIR" },
        { numerical: "414", name: "Kuwait", isoalpha3: "KWT" },
        { numerical: "417", name: "Kyrgyzstan", isoalpha3: "KGZ" },
        { numerical: "418", name: "Lao People's Democratic Republic", isoalpha3: "LAO" },
        { numerical: "428", name: "Latvia", isoalpha3: "LVA" },
        { numerical: "422", name: "Lebanon", isoalpha3: "LBN" },
        { numerical: "426", name: "Lesotho", isoalpha3: "LSO" },
        { numerical: "430", name: "Liberia", isoalpha3: "LBR" },
        { numerical: "434", name: "Libya", isoalpha3: "LBY" },
        { numerical: "438", name: "Liechtenstein", isoalpha3: "LIE" },
        { numerical: "440", name: "Lithuania", isoalpha3: "LTU" },
        { numerical: "442", name: "Luxembourg", isoalpha3: "LUX" },
        { numerical: "450", name: "Madagascar", isoalpha3: "MDG" },
        { numerical: "454", name: "Malawi", isoalpha3: "MWI" },
        { numerical: "458", name: "Malaysia", isoalpha3: "MYS" },
        { numerical: "462", name: "Maldives", isoalpha3: "MDV" },
        { numerical: "466", name: "Mali", isoalpha3: "MLI" },
        { numerical: "470", name: "Malta", isoalpha3: "MLT" },
        { numerical: "584", name: "Marshall Islands", isoalpha3: "MHL" },
        { numerical: "474", name: "Martinique", isoalpha3: "MTQ" },
        { numerical: "478", name: "Mauritania", isoalpha3: "MRT" },
        { numerical: "480", name: "Mauritius", isoalpha3: "MUS" },
        { numerical: "175", name: "Mayotte", isoalpha3: "MYT" },
        { numerical: "484", name: "Mexico", isoalpha3: "MEX" },
        { numerical: "583", name: "Micronesia (Federated States of)", isoalpha3: "FSM" },
        { numerical: "492", name: "Monaco", isoalpha3: "MCO" },
        { numerical: "496", name: "Mongolia", isoalpha3: "MNG" },
        { numerical: "499", name: "Montenegro", isoalpha3: "MNE" },
        { numerical: "500", name: "Montserrat", isoalpha3: "MSR" },
        { numerical: "504", name: "Morocco", isoalpha3: "MAR" },
        { numerical: "508", name: "Mozambique", isoalpha3: "MOZ" },
        { numerical: "104", name: "Myanmar", isoalpha3: "MMR" },
        { numerical: "516", name: "Namibia", isoalpha3: "NAM" },
        { numerical: "520", name: "Nauru", isoalpha3: "NRU" },
        { numerical: "524", name: "Nepal", isoalpha3: "NPL" },
        { numerical: "528", name: "Netherlands", isoalpha3: "NLD" },
        { numerical: "540", name: "New Caledonia", isoalpha3: "NCL" },
        { numerical: "554", name: "New Zealand", isoalpha3: "NZL" },
        { numerical: "558", name: "Nicaragua", isoalpha3: "NIC" },
        { numerical: "562", name: "Niger", isoalpha3: "NER" },
        { numerical: "566", name: "Nigeria", isoalpha3: "NGA" },
        { numerical: "570", name: "Niue", isoalpha3: "NIU" },
        { numerical: "574", name: "Norfolk Island", isoalpha3: "NFK" },
        { numerical: "580", name: "Northern Mariana Islands", isoalpha3: "MNP" },
        { numerical: "578", name: "Norway", isoalpha3: "NOR" },
        { numerical: "512", name: "Oman", isoalpha3: "OMN" },
        { numerical: "586", name: "Pakistan", isoalpha3: "PAK" },
        { numerical: "585", name: "Palau", isoalpha3: "PLW" },
        { numerical: "591", name: "Panama", isoalpha3: "PAN" },
        { numerical: "598", name: "Papua New Guinea", isoalpha3: "PNG" },
        { numerical: "600", name: "Paraguay", isoalpha3: "PRY" },
        { numerical: "604", name: "Peru", isoalpha3: "PER" },
        { numerical: "608", name: "Philippines", isoalpha3: "PHL" },
        { numerical: "612", name: "Pitcairn", isoalpha3: "PCN" },
        { numerical: "616", name: "Poland", isoalpha3: "POL" },
        { numerical: "620", name: "Portugal", isoalpha3: "PRT" },
        { numerical: "630", name: "Puerto Rico", isoalpha3: "PRI" },
        { numerical: "634", name: "Qatar", isoalpha3: "QAT" },
        { numerical: "410", name: "Republic of Korea", isoalpha3: "KOR" },
        { numerical: "498", name: "Republic of Moldova", isoalpha3: "MDA" },
        { numerical: "638", name: "Réunion", isoalpha3: "REU" },
        { numerical: "642", name: "Romania", isoalpha3: "ROU" },
        { numerical: "643", name: "Russian Federation", isoalpha3: "RUS" },
        { numerical: "646", name: "Rwanda", isoalpha3: "RWA" },
        { numerical: "652", name: "Saint-Barthélemy", isoalpha3: "BLM" },
        { numerical: "654", name: "Saint Helena", isoalpha3: "SHN" },
        { numerical: "659", name: "Saint Kitts and Nevis", isoalpha3: "KNA" },
        { numerical: "662", name: "Saint Lucia", isoalpha3: "LCA" },
        { numerical: "663", name: "Saint-Martin (French part)", isoalpha3: "MAF" },
        { numerical: "666", name: "Saint Pierre and Miquelon", isoalpha3: "SPM" },
        { numerical: "670", name: "Saint Vincent and the Grenadines", isoalpha3: "VCT" },
        { numerical: "882", name: "Samoa", isoalpha3: "WSM" },
        { numerical: "674", name: "San Marino", isoalpha3: "SMR" },
        { numerical: "678", name: "Sao Tome and Principe", isoalpha3: "STP" },
        { numerical: "680", name: "Sark", isoalpha3: "" },
        { numerical: "682", name: "Saudi Arabia", isoalpha3: "SAU" },
        { numerical: "686", name: "Senegal", isoalpha3: "SEN" },
        { numerical: "688", name: "Serbia", isoalpha3: "SRB" },
        { numerical: "690", name: "Seychelles", isoalpha3: "SYC" },
        { numerical: "694", name: "Sierra Leone", isoalpha3: "SLE" },
        { numerical: "702", name: "Singapore", isoalpha3: "SGP" },
        { numerical: "534", name: "Sint Maarten (Dutch part)", isoalpha3: "SXM" },
        { numerical: "703", name: "Slovakia", isoalpha3: "SVK" },
        { numerical: "705", name: "Slovenia", isoalpha3: "SVN" },
        { numerical: "090", name: "Solomon Islands", isoalpha3: "SLB" },
        { numerical: "706", name: "Somalia", isoalpha3: "SOM" },
        { numerical: "710", name: "South Africa", isoalpha3: "ZAF" },
        { numerical: "728", name: "South Sudan", isoalpha3: "SSD" },
        { numerical: "724", name: "Spain", isoalpha3: "ESP" },
        { numerical: "144", name: "Sri Lanka", isoalpha3: "LKA" },
        { numerical: "275", name: "State of Palestine", isoalpha3: "PSE" },
        { numerical: "729", name: "Sudan", isoalpha3: "SDN" },
        { numerical: "740", name: "Suriname", isoalpha3: "SUR" },
        { numerical: "744", name: "Svalbard and Jan Mayen Islands", isoalpha3: "SJM" },
        { numerical: "748", name: "Swaziland", isoalpha3: "SWZ" },
        { numerical: "752", name: "Sweden", isoalpha3: "SWE" },
        { numerical: "756", name: "Switzerland", isoalpha3: "CHE" },
        { numerical: "760", name: "Syrian Arab Republic", isoalpha3: "SYR" },
        { numerical: "762", name: "Tajikistan", isoalpha3: "TJK" },
        { numerical: "764", name: "Thailand", isoalpha3: "THA" },
        { numerical: "807", name: "The former Yugoslav Republic of Macedonia", isoalpha3: "MKD" },
        { numerical: "626", name: "Timor-Leste", isoalpha3: "TLS" },
        { numerical: "768", name: "Togo", isoalpha3: "TGO" },
        { numerical: "772", name: "Tokelau", isoalpha3: "TKL" },
        { numerical: "776", name: "Tonga", isoalpha3: "TON" },
        { numerical: "780", name: "Trinidad and Tobago", isoalpha3: "TTO" },
        { numerical: "788", name: "Tunisia", isoalpha3: "TUN" },
        { numerical: "792", name: "Turkey", isoalpha3: "TUR" },
        { numerical: "795", name: "Turkmenistan", isoalpha3: "TKM" },
        { numerical: "796", name: "Turks and Caicos Islands", isoalpha3: "TCA" },
        { numerical: "798", name: "Tuvalu", isoalpha3: "TUV" },
        { numerical: "800", name: "Uganda", isoalpha3: "UGA" },
        { numerical: "804", name: "Ukraine", isoalpha3: "UKR" },
        { numerical: "784", name: "United Arab Emirates", isoalpha3: "ARE" },
        { numerical: "826", name: "United Kingdom of Great Britain and Northern Ireland", isoalpha3: "GBR" },
        { numerical: "834", name: "United Republic of Tanzania", isoalpha3: "TZA" },
        { numerical: "840", name: "United States of America", isoalpha3: "USA" },
        { numerical: "850", name: "United States Virgin Islands", isoalpha3: "VIR" },
        { numerical: "858", name: "Uruguay", isoalpha3: "URY" },
        { numerical: "860", name: "Uzbekistan", isoalpha3: "UZB" },
        { numerical: "548", name: "Vanuatu", isoalpha3: "VUT" },
        { numerical: "862", name: "Venezuela (Bolivarian Republic of)", isoalpha3: "VEN" },
        { numerical: "704", name: "Viet Nam", isoalpha3: "VNM" },
        { numerical: "876", name: "Wallis and Futuna Islands", isoalpha3: "WLF" },
        { numerical: "732", name: "Western Sahara", isoalpha3: "ESH" },
        { numerical: "887", name: "Yemen", isoalpha3: "YEM" },
        { numerical: "894", name: "Zambia", isoalpha3: "ZMB" },
        { numerical: "716", name: "Zimbabwe", isoalpha3: "ZWE" }
    ],
    states:
    {
        bra:    // brazil
        [
        ],
        canada:
        [
            { name: 'Alberta', abbreviation: 'AB'},
            { name: 'British Columbia', abbreviation: 'BC '},
            { name: 'Manitoba', abbreviation: 'MB '},
            { name: 'New Brunswick', abbreviation: 'NB '},
            { name: 'Newfoundland', abbreviation: 'NL '},
            { name: 'Northwest Territories', abbreviation: 'NT '},
            { name: 'Nova Scotia', abbreviation: 'NS '},
            { name: 'Nunavut', abbreviation: 'NU '},
            { name: 'Ontario', abbreviation: 'ON '},
            { name: 'Prince Edward Island', abbreviation: 'PE '},
            { name: 'Quebec', abbreviation: 'QC '},
            { name: 'Saskatchewan', abbreviation: 'SK '},
            { name: 'Yukon', abbreviation: 'YT '}
        ],
        mex:
        [
        ],
        usa:
        [
            { name: 'Alabama', abbreviation: 'AL'},
            { name: 'Alaska', abbreviation: 'AK'},
            { name: 'American Samoa', abbreviation: 'AS'},
            { name: 'Arizona', abbreviation: 'AZ'},
            { name: 'Arkansas', abbreviation: 'AR'},
            { name: 'California', abbreviation: 'CA'},
            { name: 'Colorado', abbreviation: 'CO'},
            { name: 'Connecticut', abbreviation: 'CT'},
            { name: 'Delaware', abbreviation: 'DE'},
            { name: 'District of Columbia', abbreviation: 'DC'},
            //{ name: 'Federated States of Micronesia', abbreviation: 'FM'}, // Is now an independant nation.
            { name: 'Florida', abbreviation: 'FL'},
            { name: 'Georgia', abbreviation: 'GA'},
            { name: 'Guam', abbreviation: 'GU'},
            { name: 'Hawaii', abbreviation: 'HI'},
            { name: 'Idaho', abbreviation: 'ID'},
            { name: 'Illinois', abbreviation: 'IL'},
            { name: 'Indiana', abbreviation: 'IN'},
            { name: 'Iowa', abbreviation: 'IA'},
            { name: 'Kansas', abbreviation: 'KS'},
            { name: 'Kentucky', abbreviation: 'KY'},
            { name: 'Louisiana', abbreviation: 'LA'},
            { name: 'Maine', abbreviation: 'ME'},
            //{ name: 'Marshall Islands', abbreviation: 'MH'}, // Is geographically part of Micronesia, its own island country, and is no longer US Territory
            { name: 'Maryland', abbreviation: 'MD'},
            { name: 'Massachusetts', abbreviation: 'MA'},
            { name: 'Michigan', abbreviation: 'MI'},
            { name: 'Minnesota', abbreviation: 'MN'},
            { name: 'Mississippi', abbreviation: 'MS'},
            { name: 'Missouri', abbreviation: 'MO'},
            { name: 'Montana', abbreviation: 'MT'},
            { name: 'Nebraska', abbreviation: 'NE'},
            { name: 'Nevada', abbreviation: 'NV'},
            { name: 'New Hampshire', abbreviation: 'NH'},
            { name: 'New Jersey', abbreviation: 'NJ'},
            { name: 'New Mexico', abbreviation: 'NM'},
            { name: 'New York', abbreviation: 'NY'},
            { name: 'North Carolina', abbreviation: 'NC'},
            { name: 'North Dakota', abbreviation: 'ND'},
            { name: 'Northern Mariana Islands', abbreviation: 'MP'},
            { name: 'Ohio', abbreviation: 'OH'},
            { name: 'Oklahoma', abbreviation: 'OK'},
            { name: 'Oregon', abbreviation: 'OR'},
            //{ name: 'Palau', abbreviation: 'PW'}, // Is geographically part of Micronesia, its own island country, and is no longer US Territory
            { name: 'Pennsylvania', abbreviation: 'PA'},
            { name: 'Puerto Rico', abbreviation: 'PR'},
            { name: 'Rhode Island', abbreviation: 'RI'},
            { name: 'South Carolina', abbreviation: 'SC'},
            { name: 'South Dakota', abbreviation: 'SD'},
            { name: 'Tennessee', abbreviation: 'TN'},
            { name: 'Texas', abbreviation: 'TX'},
            { name: 'Utah', abbreviation: 'UT'},
            { name: 'Vermont', abbreviation: 'VT'},
            { name: 'Virgin Islands', abbreviation: 'VI'},
            { name: 'Virginia', abbreviation: 'VA'},
            { name: 'Washington', abbreviation: 'WA'},
            { name: 'West Virginia', abbreviation: 'WV'},
            { name: 'Wisconsin', abbreviation: 'WI'},
            { name: 'Wyoming', abbreviation: 'WY' }
        ]
    }
};

html.prototype.generate = function ( t, a1, a2 )
{
    var args = {};

    // Check if we're using model/non-plain-text values
    if( html.prototype.nk.type( a1 ) === 'array' )
    {
        if( a1[0] === false )
        {
            args['id'] = a1[1];
            args['npt'] = false;
        }
        else
        {
            args['id'] = a1[0];
            args['npt'] = a1[1];
        }
    }
    else
    {
        args['id'] = a1;
        args['npt'] = false;
    }

    if( a2 !== undefined )
    {
        html.prototype.nk.extend( args, a2 );
    }
    return html.prototype.construct( t, args );
};

html.prototype.construct = function( t, a )
{
    // Prep
    var def =
    {
        id: a.id || "",
        name: a.name || a.id || "",
        rows: 10,
        cols: 50,
        value: "",
        placeholder: "Enter value",
        checked: false,
        classes: html.prototype._classmap[t],
        index: 0,
        val: false,
        valmsg: "Error"
    },
    o = "";

    a = html.prototype.nk.extend( a, def );

    switch( t )
    {
        case 'label':
        {
            if( a.npt !== false )
            {
                if( a.npt.hasOwnProperty( 'schema' ) )
                {   // Were using a model schema
                    a.value = a.npt.schema[a.id][2];
                }
                else
                {   // Were using a viewbag value
                    a.value = a.npt;
                }
            }
            else
            {   // Were using the id as the value
                //console.log( 'No Schema [' + a.id + ']' );
                a.value = a.id;
            }

            //console.log( 'Label' );
            o = '<label class="' + a["classes"] + '" for="' + a["id"] + '">' + a.value + '</label>\n';
        }break;

        case 'textbox':
        case 'password':
        case 'submit':
        {
            if( a.npt !== false )
            {
                a.value = a.npt;
            }
            else
            {
                a.value = "";
            }
            //console.log( 'Text or Password or Submit Input Type' );
            if( !a["val"] )
            {
                o = '<input type="' + t + '" class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" tabindex="' + a["index"] + '" placeholder="' + a["placeholder"] + '">\n';
            }
            else
            {
                var tclass = "";
                if( t === 'password' )
                {
                    tclass = " valid";
                    a.value = "";
                }
                o = '<input type="' + t + '" class="' + a["classes"] + tclass + '" id="' + a["id"] + '" name="' + a["name"] + '" tabindex="' + a["index"] + '" placeholder="' + a["placeholder"] + '" data-val="' + a["val"] + '" data-val-required="' + a["valmsg"] + '">\n';
            }
        }break;

        case 'textarea':
        {
            if( a.npt !== false )
            {
                a.value = a.npt;
            }
            else
            {
                a.value = a.id;
            }
            if( !a["val"] )
            {
                o = '<textarea class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" rows="' + a["rows"] +'" cols="' + a["cols"] +'" tabindex="' + a["index"] + '" placeholder="' + a["value"] + '">\n';
            }
            else
            {
                o = '<textarea class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" rows="' + a["rows"] +'" cols="' + a["cols"] +'" tabindex="' + a["index"] + '" placeholder="' + a["value"] + '" data-val="' + a["val"] + '" data-val-required="' + a["valmsg"] + '">\n';
            }
        }break;

        case 'select':
        {
            if( !a["val"] )
            {
                o = '<select class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" tabindex="' + a["index"] + '">\n';

                for( var option in a.npt )
                {
                    o += '<option value="' + option + '">' + a.npt[option] + '</a>\n';
                }

                o += '</select>\n';
            }
            else
            {
                o = '<select class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" tabindex="' + a["index"] + '" data-val="' + a["val"] + '" data-val-required="' + a["valmsg"] + '">\n';

                for( var option in a.npt )
                {
                    o += '<option value="' + option + '">' + a.npt[option] + '</a>\n';
                }

                o += '</select>\n';
            }
        }break;

        case 'multiselect':
        {
            o = '<div class="' + a['classes'] + ' nk-select" role="combobox" tabindex="' + a["index"] + '" aria-haspopup="true">\n' +
                    '<div class="current">\n' +
                        'Select a value..\n' +
                    '</div>\n' +
                    '<div class="list-container">\n' +
                        '<ol id="selectable" class="list">\n';

            for( var option in a.npt )
            {
                o +=        '<li class="ui-widget-content">' + option + '</li>\n';
            }

            o +=        '</ol>\n' +
                    '</div>' +
                '</div>' +
                '<div class="tooltip" >' +
                    'Select' +
                '</div>';
        }break;

        case 'button':
        {
            if( a.npt !== false )
            {
                a.value = a.npt;
            }
            else
            {
                a.value = a.id;
            }
            o = '<button id="' + a["id"] + '" class="' + a["classes"] + '" tabindex="' + a["index"] + '" aria-haspopup="false">"' + a["value"] + '</button>\n';
        }break;

        case 'checkbox':
        case 'radio':
        {
            if( a.npt !== false )
            {
                if( t === 'radio' )
                {
                    // A radio is usually in a group of other radios, the values could be numeric or textual, and expand beyond a simple true false for the group.
                    a.value = a.npt;
                }
                else
                {
                    // Checkbox only needs to be 0 or 1, because the name is essentially the only textual value we need
                    a.value = 1;
                }
            }
            else
            {
                if( t === 'radio' )
                {
                    a.value = a.id;
                }
                else
                {
                    a.value = 1;
                }
            }

            //console.log( 'Checkbox' );
            var checked = "";
            if( a["checked"] !== false )
            {
                checked = 'checked="checked"';
            }

            if( !a["val"] )
            {
                o = '<input type="' + t + '" class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" tabindex="' + a["index"] + '" value="' + a.value + '" ' + checked + '>\n';
            }
            else
            {
                o = '<input type="' + t + '" class="' + a["classes"] + '" id="' + a["id"] + '" name="' + a["name"] + '" tabindex="' + a["index"] + '" value="' + a.value + '" data-val="' + a["val"] + '" data-val-required="' + a["valmsg"] + '" ' + checked + '>\n';
            }
        }break;

        case 'validationmessage':
        {
            o = '<span class="field-validation-valid" data-valmsg-for="' + a["id"] + '" data-valmsg-replace="' + a["val"] +'"></span>\n';
        }break;

        default:
        {
            o = "default";
        }break;
    }

    return String( o );
};
