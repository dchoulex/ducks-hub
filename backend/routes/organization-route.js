import express from "express";
import { getOrganizations,
         putOrganization,
         getOrganization
        } from "./../controllers/organization-controller.js";


const router = express.Router();


router
    .route("/")
    .get(getOrganizations);

router
    .route("/")
    .put(putOrganization);

router
    .route("/:organizationid")
    .get(getOrganization);



export default router;