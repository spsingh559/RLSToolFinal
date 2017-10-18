// import path from 'path';
const path = require('path');

module.exports = {
   entry:"./public/components/App.jsx",
   output: {
    path: __dirname + "/public/javascripts",
      //  path:"./public/javascripts/",
       filename: "bundle.js"
   },
   module:{
       loaders:[
        {
          loader: 'babel-loader',
          test:/\.jsx$/, // 'babel-loader' is also a legal name to reference
          query: {
            presets: ["es2015","react","stage-1"]
         }
       },// for css
        { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
      },
       resolve:{
        extensions:['','.','.js','.jsx','/index.js', '/index.jsx']
      }, // for genrating Excel Sheet
      node: {fs: 'empty'},
          externals: [
            {'./cptable': 'var cptable'},
            {'./jszip': 'jszip'}
          ]
    };


// module.exports = {
//    entry: {
//      main:"./public/components/App.jsx"
//     //  vendor: [
//     //     'react',
//     //     'react-dom',
//     //     'xlsx',
//     //     'file-saver'
//     //   ]
//    },
//    output: {
//        path:"./public/javascripts",
//        filename: "bundle.js"
//    },
//    module:{
//        loaders:[
//         {
  //           loader: 'babel',
//           test:/\.jsx$/, // 'babel-loader' is also a legal name to reference
//           query: {
//             presets: ["es2015","react","stage-1"]
//          }
//        }
//
//       //  {test: /\.json$/, loader: "json-loader"}
//       //  {
//       //      test: /\.(jpe?g|png|svg)$/i,
//       //      loaders: [
//       //        'file?hash=sha512&digest=hex&name=[hash].[ext]',
//       //        'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
//       //       ]
//       //   }
//         ]
//    },
//    resolve:{
//     extensions:['.','.js','.jsx','/index.js', '/index.jsx']
//   }
//   // node: {fs: 'empty'},
//   //   externals: [
//   //     {'./cptable': 'var cptable'},
//   //     {'./jszip': 'jszip'}
//   //   ]
// };
//
// // var webpack = require('webpack');
// // var path = require('path');
// // var buildPath = path.resolve(__dirname, 'build');
// // var nodeModulesPath = path.resolve(__dirname, 'node_modules');
// // var TransferWebpackPlugin = require('transfer-webpack-plugin');
// //
// // var config = {
// //   //Entry points to the project
// //   entry: [
// //     'webpack/hot/dev-server',
// //     'webpack/hot/only-dev-server',
// //     path.join(__dirname, './public/components/App.jsx')
// //   ],
// //   //Config options on how to interpret requires imports
// //   resolve:{
// //    extensions:['','.js','.jsx','/index.js', '/index.jsx']
// //   },
// //   //Server Configuration options
// //   devServer:{
// //     contentBase: '',  //Relative directory for base of server
// //     devtool: 'eval',
// //     hot: true,        //Live-reload
// //     inline: true,
// //     port: 8080        //Port Number
// //   },
// //   devtool: 'eval',
// //   output: {
// //     path:"./public/javascripts",
// //     filename: "bundle.js"
// //   },
// //   plugins: [
// //     //Enables Hot Modules Replacement
// //     new webpack.HotModuleReplacementPlugin(),
// //     //Allows error warnings but does not stop compiling. Will remove when eslint is added
// //     new webpack.NoErrorsPlugin(),
// //     //Moves files
// //     new TransferWebpackPlugin([
// //       {from: 'www'}
// //     ], path.resolve(__dirname, "public"))
// //   ],
// //   module:{
// //       loaders:[
// //        {loader: 'babel',
// //          test:/\.jsx$/, // 'babel-loader' is also a legal name to reference
// //          query: {
// //            presets: ["es2015","react","stage-1"]
// //         } }
// //        ]
// //   },
// //   //eslint config options. Part of the eslint-loader package
// //   eslint: {
// //     configFile: '.eslintrc'
// //   },
// // };
// //
// // module.exports = config;
