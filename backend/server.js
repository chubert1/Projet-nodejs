import express from 'express';
import cors from 'cors'; 
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Issue from './models/issue';


const app = express();
const router = express.Router();

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

app.use(cors());
app.use(bodyParser.json());
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/issues',{ useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
  );

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
        if(err) {
            console.log(err);
        } else {
            res.json(issues);
        }
    });
});

router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if(err) {
            console.log(err);
        } else {
            res.json(issue);
        }
    });
});

router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save()
    .then(issue => {
        res.status(200).json({'issue': 'Ajouté avec succès' });
    })
    .catch( err => {
        res.status(400).send('Erreur a la création d\'un nouvel enregistrement');
    });
});

router.route('/issues/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if(!issue) {
            return next(new Error('impossible de charger le document'));
        } else {
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

            issue.save().then( issue => {
               res.json('Mis à jour effectuée !'); 
            }).catch(err => {
                res.status(400).send('Mis à jour non effectuée !!!');
            });
        }
    });
});
/* DELETE BOOK */
router.delete('/issues/delete/:id', function(req, res, next) {
    Issue.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
/*
router.route('/isses/delete/:id').get((req, res) => {
    // {_id: req.params.id}
   // const id = new mongoose.Types.ObjectId(req.params.id);
    Issue.findOneAndDelete({_id: req.params.id}, (err, issue) => {
        if(err) {
            res.json(err);
        } else {
            res.json('Removed successfully');
        }
    });
});
/*
router.route('/isses/delete/:id').get((req, res) => {
    // {_id: req.params.id}
   // const id = new mongoose.Types.ObjectId(req.params.id);
    Issue.findOneAndRemove({_id: req.params.id}, (err, issue) => {
        if(err) {
            res.json(err);
        } else {
            res.json('Element supprimé !!');
        }
    });
});
*/
app.use('/', router);


app.listen(4000, () => console.log('Express server running on port 4000'));

