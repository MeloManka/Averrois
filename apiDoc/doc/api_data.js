define({ "api": [
  {
    "type": "get",
    "url": "/:profileId/biography",
    "title": "User Biography",
    "name": "GetBiography",
    "group": "Biography",
    "version": "0.0.0",
    "filename": "./apidoc.js",
    "groupTitle": "Biography"
  },
  {
    "type": "post",
    "url": "/:profileId/biography/update",
    "title": "User Biography Update",
    "name": "UpdateBiography",
    "group": "Biography",
    "version": "0.0.0",
    "filename": "./apidoc.js",
    "groupTitle": "Biography"
  },
  {
    "type": "post",
    "url": "/:profileId/publishing/addpublication",
    "title": "Add Publication",
    "name": "AddPublication",
    "group": "Publishing",
    "version": "0.0.0",
    "filename": "./apidoc.js",
    "groupTitle": "Publishing"
  },
  {
    "type": "delete",
    "url": "/:profileId/publishing/:publicationId/delete",
    "title": "Delete Publication",
    "name": "DeletePublication",
    "group": "Publishing",
    "version": "0.0.0",
    "filename": "./apidoc.js",
    "groupTitle": "Publishing"
  },
  {
    "type": "get",
    "url": "/:profileId/publishing/:publicationId",
    "title": "Get Publication",
    "name": "GetPublication",
    "group": "Publishing",
    "version": "0.0.0",
    "filename": "./apidoc.js",
    "groupTitle": "Publishing"
  },
  {
    "type": "get",
    "url": "/:profileId/publishing",
    "title": "User Publishing",
    "name": "GetPublishing",
    "group": "Publishing",
    "version": "0.0.0",
    "filename": "./apidoc.js",
    "groupTitle": "Publishing"
  },
  {
    "type": "post",
    "url": "/:profileId/publishing/:publicationId/update",
    "title": "Update Publication",
    "name": "UpdatePublication",
    "group": "Publishing",
    "version": "0.0.0",
    "filename": "./apidoc.js",
    "groupTitle": "Publishing"
  },
  {
    "type": "get",
    "url": "/:profileId/user",
    "title": "Request User information",
    "name": "GetUser",
    "group": "User",
    "version": "0.0.0",
    "filename": "./apidoc.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login",
    "name": "Login",
    "group": "User",
    "version": "0.0.0",
    "filename": "./apidoc.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/registration",
    "title": "Responce User information",
    "name": "PostUser",
    "group": "User",
    "version": "0.0.0",
    "filename": "./apidoc.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/:profileId/update",
    "title": "Update User information",
    "name": "UpdateUser",
    "group": "User",
    "version": "0.0.0",
    "filename": "./apidoc.js",
    "groupTitle": "User"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p> "
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "_home_kgolovchik_CourseWork_course_apiDoc_doc_main_js",
    "groupTitle": "_home_kgolovchik_CourseWork_course_apiDoc_doc_main_js",
    "name": ""
  }
] });