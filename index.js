
const baseurl= 'https://realprotect.qa.trellix.com'

//function to fetch queries with inputquery obj as parameter where inputquery stores original request
 async function makeRequest(inputquery) {

    //to store responses of all the queries
    let actualresponse = [];

    //iterate through each query
    for (let i = 0; i < inputquery.length; i++) {

        //destruct to store keys of each query
        const {path, query, expected, timestamp} = inputquery[i];

        //constructing url
        const url = `${baseurl}${path}`;

        //fetch response for each url
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(query),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        //store response in individualresponse 
        const individualresponse = await response.json();

        //push individualresponse in actualresponse array
        actualresponse.push(individualresponse)

    }
    return actualresponse;
}



//function to check response with inputquery obj as parameter where inputquery stores original request

 async function checkResponse(inputquery) {
    //to store status of each of the queries
    let finalOutput = []
    //call
    const responses = await makeRequest(inputquery);

    //iterate through each query
    for (let i = 0; i < inputquery.length; i++) {

        if (JSON.stringify(responses[i]) !== JSON.stringify(inputquery[i].expected)) {
            finalOutput.push({ path: inputquery[i].path, query: inputquery[i].query, actual_output: responses[i], expected_output: inputquery[i].expected, timestamp: inputquery[i].timestamp, TestStatus: 'Fail' })
        }
        else finalOutput.push({ path: inputquery[i].path, query: inputquery[i].query, actual_output: responses[i], expected_output: inputquery[i].expected, timestamp: inputquery[i].timestamp, TestStatus: 'Pass' })
    }
    console.log(finalOutput);

}

//INPUT 
const input = [
    {
        
        "path": "/api/v7/query",
        "query": {
            "fvecmd5": "6C72D87306712F912F38EBC97DA6E8FE",
            "samplemd5": "98D2576AD91F1CE41CAA8BC38D263937",
            "artemisQuery": "0",
            "guid": "69c6ac5a-8998-9399-3776-6bbcc77eebb0",
            "repeat": "0",
            "version": "10858",
            "sfvecversion": "2",
            "metadata": "[{\"AV\":\"NA\"},{\"CE\":\"2148204800\"},{\"CQO\":\"2,9,10,10\"},{\"CT\":\"WVT\"},{\"JV\":\"22.7.0.452\"},{\"MD5O\":\"VTP\"},{\"MR\":\"0\"},{\"OB\":\"2\"},{\"OL\":\"1033\"},{\"P\":\";98D2576AD91F1CE41CAA8BC38D263937;-1;\"},{\"PUID\":\"133216703466061074_21192\"},{\"PV\":\"22.10.0.17\"},{\"S\":\"tcxap\"},{\"TM\":\"16384\"},{\"TR\":\"0.106096\"},{\"TT\":\"false\"},{\"UT\":\"133.316956\"}]",
            "sfvecmd5": "949F7B93EA9A9626C34770CAACBC6565",
            "ProductID": "1004",
            "scancontext": "PROCESS_SCAN",
            "sensitivity": "H",
            "filetype": "2",
            "sample_file_size": "0"
        },
        "expected": {
            "C": "T",
            "TT": "30",
            "should_submit_sample": 0
        },
        "timestamp": "2023-02-23T23:59:47.578Z"
    }
    ,{
        
        path: '/api/v7/query',
        query: {
            "fvecmd5": "CB2C689EB46FD882DC7DE19F51218BBF",
            "samplemd5": "73F1C6D579D5F18666800A4E18659E68",
            "artemisQuery": "0",
            "guid": "23329319-ed3e-90d9-0aa2-299668899881",
            "repeat": "0",
            "version": "11245",
            "sfvecversion": "2",
            "metadata": "[{\"AV\":\"22.7.0.573.12\"},{\"CE\":\"0\"},{\"CQO\":\"2,9\"},{\"CT\":\"VTP\"},{\"JV\":\"22.7.0.452\"},{\"MD5O\":\"VTP\"},{\"MR\":\"0\"},{\"OB\":\"2\"},{\"OL\":\"1033\"},{\"P\":\";73F1C6D579D5F18666800A4E18659E68;-1;\"},{\"PUID\":\"133216703295198797_24188\"},{\"PV\":\"10.7.0.5177\"},{\"S\":\"tcxap\"},{\"TAP\":\"0.122775\"},{\"TM\":\"16384\"},{\"TR\":\"0.153468\"},{\"TT\":\"false\"},{\"UT\":\"9.066027\"}]",
            "sfvecmd5": "E96A4BE1F3EED4788641E2F75BE40524",
            "ProductID": "1002",
            "scancontext": "PROCESS_SCAN",
            "sensitivity": "M",
            "filetype": "0",
            "sample_file_size": "0"
        },
        expected: {
            "C": "U",
            "TT": "30",
            "REP": 50,
            "CON": 0.750076203976917,
            "should_submit_sample": 0
        }
    },
    {
        
        path: '/api/v7/query',
        query: {
            "fvecmd5": "NONE",
            "samplemd5": "3E66E2677B027FF49D572F7AE83EBB5D",
            "artemisQuery": "0",
            "parentMD5": "D45BD7C7B7BF977246E9409D63435231",
            "guid": "efbe0b50-feff-25e2-5ddc-c88ee00aa995",
            "filePath": "C:\\\\Program Files (x86)\\\\Vigilant Solutions\\\\TAS Client\\\\TASClient.exe",
            "Heuristic": "",
            "parentCMD": "\"C:\\\\Windows\\\\09E592C4A21A21B39F22AA7D7170F162.exe\"",
            "repeat": "0",
            "version": "11245",
            "sfvecversion": "2",
            "osvbn": "19044",
            "osvmn": "0",
            "osvmj": "10",
            "tfvec": "[{}]",
            "publickey": "",
            "metadata": "[{\"AV\":\"21.4.0.329.2\"},{\"CE\":\"3\"},{\"CQO\":\"2\"},{\"CT\":\"VTP\"},{\"JV\":\"21.4.0.85\"},{\"MD5O\":\"VTP\"},{\"MR\":\"0\"},{\"OB\":\"2\"},{\"OL\":\"1033\"},{\"P\":\";3E66E2677B027FF49D572F7AE83EBB5D;-1;\"},{\"PUID\":\"133216703865070462_1844\"},{\"PV\":\"10.7.0.2913\"},{\"RF\":\"{\"Version\":1,\"Bools\":[0],\"Numericals\":[48,0]}\"},{\"S\":\"tcxap\"},{\"TAP\":\"0.158096\"},{\"TM\":\"8192\"},{\"TR\":\"0.158096\"},{\"TT\":\"false\"},{\"UT\":\"376.598358\"}]",
            "sfvecmd5": "28A760E0A98547945B937B4DDEE764E3",
            "ProductID": "1002",
            "querytype": "STATIC",
            "csvm_model_version": "11001",
            "csvm_score": "0",
            "filetype": "2",
            "scancontext": "PROCESS_SCAN",
            "sensitivity": "M",
            "sfvec": "[{\"Bytes\":[\"734D3871E9525291DAAEF282ADA3C652\",\"2C7357ED6B79A3F7E9532870BF302D66\",\"F34D5F2D4577ED6D9CEEC516C1F5A744\",\"00000000000000000000000000000000\"],\"Bools\":\"143305090C012AE80000000004000000000000\",\"Numericals\":[1015808,0,0,16,3,1,0,0,4524969,1,7,4,3,0,1,0,16,490],\"Categoricals\":[\"5e68b3de\",\"2\",\"8560\",\"2\",\"22\",\"0\",\"47d\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"],\"Strings\":[\"\",\"TASClient\",\"TASClient.exe\",\"d:\\\\BUILD\\\\TAS_C#\\\\2020-03-11\\\\TASClient\\\\obj\\\\Release\\\\TASClient.pdb\",\"\",\"MyApplication.app\",\"\",\"Microsoft Visual C# / Basic .NET\",\"\"]}]",
            "trace": "NONE",
            "fvec": "NONE"
        },
        expected: {
            "C": "U",
            "TT": "30",
            "REP": 50,
            "CON": 0.7977435233634637,
            "should_submit_sample": 0
        }
    },


];
console.log(checkResponse(input));


