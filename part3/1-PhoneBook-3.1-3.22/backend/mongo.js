const mongoose = require('mongoose')

if (process.argv.length<3 || process.argv.length == 4)
{
    console.log("[!] Err command syntax.\nCorrect syntax:\n\tnode mongo.js DB_PSWD NOTE_NAME NOTE_NUMBER");
    process.exit(1);
}

const password = process.argv[2];
const username = "manuel_teves";
const db_name  = "phoneApp";

const url = `mongodb+srv://${username}:${password}@cluster0.ythuy5f.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phone = mongoose.model('Phone', phoneSchema);

if (process.argv.length >= 5)
{
    const phone = new Phone({
        name: process.argv[3],
        number: process.argv[4],
      });
      
      phone.save().then(result => {
        console.log('phone saved!');
        mongoose.connection.close();
    });
}
else
{
    Phone.find({}).then(result => {
        result.forEach(phone => {
          console.log(phone);
        });
        mongoose.connection.close();
    });
}