
const ExistTokenId = (erc721Instance, tokenId) => {
    return new Promise((resolve, reject) => {
    erc721Instance.methods.exists(tokenId).call()
        .then(res => {
            console.log(res);
            resolve(res);
        })
        .catch(err => {
            console.log(err);
            reject(err);
        })
    })
}
 
export default ExistTokenId;