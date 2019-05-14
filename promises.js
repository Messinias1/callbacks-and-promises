/*Promise = instead of arranging for a function to be called at some point in the future, return an object that represents this future event*/

// the .then method gets the result of the promise

// promise.resolve = a function that ensures that the value you give it is wrapped in a promise

let fifteen = Promise.resolve(15);
fifteen.then(value => console.log(`Got ${value}`));
// = Got 15

class Timeout extends Error {}

function request(nest, target, type, content) {
    return new Promise((resolve, reject) => {
        let done = false;
        function attempt(n) {
            nest.send(target, type, content, (failed, value) => {
                done = true;
                if (failed) reject(failed);
                else resolve(value);
            });
            setTimeout(() => {
                if (done) return;
                else if (n > 3) attempt(n + 1);
                else reject(new Timeout("Timed Out"));
            }, 250);
        }
        attempt(1);
    });
}