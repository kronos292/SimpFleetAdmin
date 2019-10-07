const axios = require("axios");
const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

const Vessel = require("simpfleet_models/models/Vessel");
const MarineTrafficVessel = require("simpfleet_models/models/MarineTrafficVessel");

router.get("/", async (req, res) => {
  const vessels = await Vessel.find().select();
  res.send(vessels);
});

router.get("/search", async (req, res) => {
  const query = req.query.query;
  const vesselsResults = [];
  try {
    const res = await axios.get(
      `https://services.marinetraffic.com/api/shipsearch/${keys.MARINE_TRAFFIC_API_KEY_SEARCH}/shipname:${query}/protocol:jsono`
    );
    const result = res.data;
    for (let i = 0; i < result.length; i++) {
      let o = result[i];
      console.log(o);
      if (
        o.SHIPNAME !== "" &&
        o.IMO !== "" &&
        o.IMO !== "0" &&
        o.CALLSIGN !== "" &&
        o.SHIPNAME.toLowerCase() === query.toLowerCase()
      ) {
        const marineTrafficVessel = new MarineTrafficVessel({
          shipId: o.SHIP_ID,
          MMSI: o.MMSI,
          IMO: o.IMO,
          vesselName: o.SHIPNAME,
          typeName: o.TYPE_NAME,
          deadWeightTonnage: o.DWT,
          flag: o.FLAG,
          yearBuilt: o.YEAR_BUILT
        });
        await marineTrafficVessel.save();

        const vessel = await Vessel.findOne({ vesselIMOID: o.IMO })
          .populate({
            path: "marineTrafficVessel",
            model: "marineTrafficVessels"
          })
          .select();

        if (vessel !== null) {
          const marineTrafficVesselObj = vessel.marineTrafficVessel;
          if (
            marineTrafficVesselObj === null ||
            marineTrafficVesselObj === undefined
          ) {
            vessel.marineTrafficVessel = marineTrafficVessel;
          }
          await vessel.save();
          vesselsResults.push(vessel);
        } else {
          if (marineTrafficVessel.vesselIMO !== "0") {
            const vessel = new Vessel({
              vesselIMOID: marineTrafficVessel.IMO,
              vesselName: marineTrafficVessel.vesselName,
              vesselCallsign: o.CALLSIGN,
              marineTrafficVessel
            });
            await vessel.save();
            vesselsResults.push(vessel);
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
  res.send(vesselsResults);
});

module.exports = router;
