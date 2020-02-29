const { Router } = require('express');

const router = Router();

module.exports = (usersController) => {
  router.get('/', (req, res, next) => {
    usersController.findAll()
      .then((users) => res.send(users))
      .catch((error) => next(error));
  });

  router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    usersController.findOneById(id)
      .then((user) => (res.send(user)))
      .catch((error) => next(error));
  });

  router.patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const user = req.body;
    usersController.updateOneById(id, user)
      .then((modifiedUser) => res.send(modifiedUser))
      .catch((error) => next(error));
  });

  router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    usersController.deleteOneById(id)
      .then(() => {
        res.status(204).send();
      })
      .catch((error) => next(error));
  });

  router.delete('/', (req, res, next) => {
    usersController.deleteAll()
      .then(() => {
        res.status(204).send();
      })
      .catch((error) => next(error));
  });

  return router;
};
