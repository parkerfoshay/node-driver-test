const router = require("express").Router();

const db = require("../../config/connection");

router.get("/", async (req, res) => {
  try {
    const dbConnect = db.getDb();

    dbConnect
      .collection("listingsAndReviews")
      .find({})
      .limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
        } else {
          res.json(result);
        }
      });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.post("/record", async (req, res) => {
  try {
    const dbConnect = db.getDb();
    const matchDocument = {
      listing_id: req.body.id,
      last_modified: new Date(),
      session_id: req.body.session_id,
      direction: req.body.direction,
    };

    console.log(req.body);

    dbConnect
      .collection("matches")
      .insertOne(matchDocument, function (err, result) {
        if (err) {
          res.status(400).send("Error inserting matches!");
        } else {
          console.log(`Added a new match with id ${result.insertedId}`);
          res.status(204).send();
        }
      });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.post("/updateLike", async (req, res) => {
  try {
    const dbConnect = db.getDb();

    const listingQuery = { _id: req.body.id };
    const updates = {
      $inc: {
        likes: 1,
      },
    };

    console.log(req.body);

    dbConnect
      .collection("listingsAndReviews")
      .updateOne(listingQuery, updates, function (err, _result) {
        if (err) {
          res
            .status(400)
            .send(
              `Error updating likes on listing with id ${listingQuery.id}!`
            );
        } else {
          console.log("1 document updated");
          console.log(JSON.stringify(_result))
          res.status(204).send();
        }
      });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const dbConnect = db.getDb();

    const listingQuery = { _id: req.params.id };
    console.log(req.body)
    console.log(req.query)
    console.log(req.params.id)

    dbConnect
      .collection("listingsAndReviews")
      .deleteOne(listingQuery, function (err, _result) {
        if (err) {
          res
            .status(400)
            .send(`Error deleting listing with id ${listingQuery.listing_id}!`);
        } else {
          console.log("1 document deleted");
          console.log("Deleted: " + JSON.stringify(_result))
          res.status(204).send();
        }
      });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

module.exports = router;
