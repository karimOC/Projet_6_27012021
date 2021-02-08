const Thing = require("../models/thing");
const fs = require("fs");

exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id,
  })
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyThing = (req, res, next) => {
  const thingObject = req.file
    ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Thing.updateOne(
    { _id: req.params.id },
    { ...thingObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.likeThing = (req, res, next) => {
  const thingObject = req.body;
  const userId = sauceObject.userId;
  const like = sauceObject.like;

  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      if (like == 1) {
        thing.usersLiked.push(userId);
        thing.likes++;
      } else if (like == -1) {
        thing.usersDisliked.push(userId);
        thing.dislikes++;
      } else if (like == 0 && Thing.usersLiked.includes(userId)) {
        thing.likes--;
        let pos = thing.usersLiked.indexOf(userId);
        thing.usersLiked.splice(pos, 1);
      } else if (like == 0 && thing.usersDisliked.includes(userId)) {
        thing.dislikes--;
        let pos = thing.usersDisliked.indexOf(userId);
        thing.usersDisliked.splice(pos, 1);
      }
      thing
        .updateOne(
          { _id: req.params.id },
          {
            usersLiked: thing.usersLiked,
            usersDisliked: thing.usersDisliked,
            dislikes: thing.dislikes,
            likes: thing.likes,
            _id: req.params.id,
          }
        )
        .then(() => res.status(200).json({ message: "Objet modifié !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      const filename = thing.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
};

exports.getAllsauces = (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
