const Sauce = require("../models/Sauce");
const fs = require("fs");

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
  const sauceObject = req.body;
  const userId = sauceObject.userId;
  const like = sauceObject.like;

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (like == 1) {
        sauce.usersLiked.push(userId);
        sauce.likes++;
      } else if (like == -1) {
        sauce.usersDisliked.push(userId);
        sauce.dislikes++;
      } else if (like == 0 && Sauce.usersLiked.includes(userId)) {
        sauce.likes--;
        let pos = sauce.usersLiked.indexOf(userId);
        sauce.usersLiked.splice(pos, 1);
      } else if (like == 0 && sauce.usersDisliked.includes(userId)) {
        sauce.dislikes--;
        let pos = sauce.usersDisliked.indexOf(userId);
        sauce.usersDisliked.splice(pos, 1);
      }
      sauce
        .updateOne(
          { _id: req.params.id },
          {
            usersLiked: sauce.usersLiked,
            usersDisliked: sauce.usersDisliked,
            dislikes: sauce.dislikes,
            likes: sauce.likes,
            _id: req.params.id,
          }
        )
        .then(() => res.status(200).json({ message: "Objet modifié !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
};

exports.getAllsauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
