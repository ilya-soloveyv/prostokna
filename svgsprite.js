'use strict';

var config = {
  entryView: 'public/src/images/icons/view',
  entrySymbol: 'public/src/images/icons/symbol',
  dest: 'static/images',
};

var SVGSpriter = require('svg-sprite'),
  mkdirp = require('mkdirp'),
  path = require('path'),
  fs = require('fs'),
  File = require('vinyl'),
  glob = require('glob'),
  viewSpriter = new SVGSpriter({
    dest: config.dest,
    mode: {
      view: {
        transform: ['svgo'],
        svg: {
          // General options for created SVG files
          xmlDeclaration: false, // Add XML declaration to SVG sprite
          doctypeDeclaration: false, // Add DOCTYPE declaration to SVG sprite
          namespaceIDs: true, // Add namespace token to all IDs in SVG shapes
          namespaceIDPrefix: '', // Add a prefix to the automatically generated namespaceIDs
          namespaceClassnames: true, // Add namespace token to all CSS class names in SVG shapes
          dimensionAttributes: true, // Width and height attributes on the sprite
        },
        layout: 'vertical',
        dest: './',
      },
    },
  }),
  viewCwd = path.resolve(config.entryView),
  symbolSpriter = new SVGSpriter({
    dest: config.dest,
    mode: {
      symbol: {
        transform: ['svgo'],
        svg: {
          // General options for created SVG files
          xmlDeclaration: false, // Add XML declaration to SVG sprite
          doctypeDeclaration: false, // Add DOCTYPE declaration to SVG sprite
          namespaceIDs: true, // Add namespace token to all IDs in SVG shapes
          namespaceIDPrefix: '', // Add a prefix to the automatically generated namespaceIDs
          namespaceClassnames: true, // Add namespace token to all CSS class names in SVG shapes
          dimensionAttributes: true, // Width and height attributes on the sprite
        },
        dest: './',
      },
    },
  }),
  symbolCwd = path.resolve(config.entrySymbol);

// Find SVG files recursively via `glob`
glob.glob('**/*.svg', { cwd: viewCwd }, function (err, files) {
  files.forEach(function (file) {
    // Create and add a vinyl file instance for each SVG
    viewSpriter.add(
      new File({
        path: path.join(viewCwd, file), // Absolute path to the SVG file
        base: viewCwd, // Base path (see `name` argument)
        contents: fs.readFileSync(path.join(viewCwd, file)), // SVG file contents
      })
    );
  });

  viewSpriter.compile(function (error, result, data) {
    for (var type in result.view) {
      mkdirp.sync(path.dirname(result.view[type].path));
      fs.writeFileSync(result.view[type].path, result.view[type].contents);
    }
  });
});

glob.glob('**/*.svg', { cwd: symbolCwd }, function (err, files) {
  files.forEach(function (file) {
    // Create and add a vinyl file instance for each SVG
    symbolSpriter.add(
      new File({
        path: path.join(symbolCwd, file), // Absolute path to the SVG file
        base: symbolCwd, // Base path (see `name` argument)
        contents: fs.readFileSync(path.join(symbolCwd, file)), // SVG file contents
      })
    );
  });

  symbolSpriter.compile(function (error, result, data) {
    for (var type in result.symbol) {
      mkdirp.sync(path.dirname(result.symbol[type].path));
      fs.writeFileSync(result.symbol[type].path, result.symbol[type].contents);
    }
  });
});
