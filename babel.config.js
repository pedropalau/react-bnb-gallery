module.exports = {
  "env": {
    "test": {
      "presets": [
        "@babel/preset-env",
        "@babel/preset-react",
        "airbnb"
      ]
    },
    "development": {
      "presets": [
        "@babel/preset-env",
        "@babel/preset-react",
        "airbnb"
      ]
    },
    "production": {
      "presets": [
        ["airbnb", {
          "removePropTypes": true
        }]
      ],
    }
  },
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-syntax-dynamic-import",
    ["@babel/plugin-transform-object-assign", {
      "moduleSpecifier": "object.assign"
    }]
  ]
}
