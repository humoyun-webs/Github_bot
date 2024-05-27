// const moment = require('moment')
// const simpleGit = require('simple-git')
// const random = require("random")
// const File_Path = './data.json'

// const makeCommit = n =>{
//     if(n===0) return simpleGit().push();
//     const x = random.int(0,54);
//     const y = random.int(0,6);
//     const Date = moment().subtract(1,'y').add(1,'d')
//                  .add(x,'w').add(y,'d').format();

//     const data = {
//         date:Date
//     }
//     console.log(Date);

//     jsonfile.writeFile(File_Path,data,() =>{
//         simpleGit().add([File_Path]).commit(Date, {'--date':Date},
//             makeCommit.bind(this, --n))
//     });
// }
// makeCommit(500)




const moment = require('moment');
const simpleGit = require('simple-git')();
const random = require('random');
const jsonfile = require('jsonfile');
const File_Path = require('./data.json');

const makeCommit = n => {
    if (n === 0) {
        return simpleGit.push((err) => {
            if (err) {
                console.error('Failed to push commits:', err);
            } else {
                console.log('All commits pushed successfully.');
            }
        });
    }

    const x = random.int(0, 54);
    const y = random.int(0, 6);
    const Date = moment().subtract(1, 'y').add(1, 'd')
        .add(x, 'w').add(y, 'd').format();

    const data = {
        date: Date
    };
    console.log(Date);

    jsonfile.writeFile(File_Path, data, (err) => {
        if (err) {
            console.error('Failed to write to file:', err);
            return;
        }

        simpleGit.add([File_Path], (err) => {
            if (err) {
                console.error('Failed to add file:', err);
                return;
            }

            simpleGit.commit(Date, { '--date': Date }, (err) => {
                if (err) {
                    console.error('Failed to commit:', err);
                    return;
                }

                makeCommit(n - 1); // Recursive call without binding
            });
        });
    });
};

makeCommit(500);
