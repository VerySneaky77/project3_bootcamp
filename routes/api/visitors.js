const router = require("express").Router();

// Import connection to database
const db = require("../../models");

// =======================
// Order Finance Controls
// =======================

// Find and return all ordered items
router.get("/:id/orders", (req, res) => {
  db.Visitors
    .find({ owner: req.params.id })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

// Find and return all items ordered today
router.get("/:id/orders/today", (req, res) => {
  db.Visitors
    .find({ owner: req.params.id, date: Date.now })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

// Find and return all items ordered on specific date
router.get("/:id/orders/:date", (req, res) => {
  db.Visitors
    .find({ owner: req.params.id, date: req.params.date })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

// Post a new ordered item
router.post("/:id/orders", (req, res) => {
  db.Orders
    .create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

// Update an ordered item
router.put("/:id/orders/:oId", (req, res) => {
  db.Orders
    .findOneAndUpdate({ _id: req.params.oId }, req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

// ====================
// Information Controls
// ====================

// Check visitor information
router.get("/info", (req, res) => {
  db.Visitors
    .find()
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
});

// Check visitor information
router.get("/info/:phone", (req, res) => {
  // find by phone
  // if there is no associated phone, an empty array will be returned
  db.Visitors
    .find({ phone: req.params.phone })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
});

// Create new visitor field
router.post("/info", (req, res) => {
  db.Visitors
    .create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
})

module.exports = router;