import Issue from '../models/issue';



module.exports = function(server){


     
    /**
     * Create
     */

     server.post('/issues/add', (req, res, next) => {
         let data = req.body || {}
         Issue.create(data)
         .then(task => {
             res.send(200, task)
             next()
         })
         .catch(err => {
            res.send(500, err)
         })
     })

      /**
     * List
     */
    server.get('/issues', (req, res, next) => {

        let limit = parseInt(req.query.limit, 10) || 10, // default limit to 10 docs
            skip  = parseInt(req.query.skip, 10) || 0, // default skip to 0 docs
            query = req.query || {}

        // remove skip and limit from query to avoid false querying
        delete query.skip
        delete query.limit

        Issue.find(query).skip(skip).limit(limit)
            .then(tasks => {
                res.send(200, tasks)
                next()
            })
            .catch(err => {
                res.send(500, err)
            })

    })
    /**
     * Read
     */
    server.get('/issues/:id', (req, res, next) => {

        Issue.findById(req.params.id)
            .then(issue => {
                res.send(200, issue)
                next()
            })
            .catch(err => {
                res.send(500, err)
            })

    })
    /**
     * Update
     */
    server.put('/issues/update/:id', (req, res, next) => {

        let data = req.body || {},
            opts = {
                new: true
            }

            Issue.findByIdAndUpdate({ _id: req.params.id }, data, opts)
            .then(issue => {
                res.send(200, issue)
                next()
            })
            .catch(err => {
                res.send(500, err)
            })

    })
    /**
     * Delete
     */
    server.del('/isses/delete/:id', (req, res, next) => {

        Issue.findOneAndRemove({ _id: req.params.id })
            .then(() => {
                res.send(204)
                next()
            })
            .catch(err => {
                res.send(500, err)
            })

    })


}