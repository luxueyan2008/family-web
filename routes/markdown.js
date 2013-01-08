
/*
 * GET markdown files.
 */

exports.demo = function(req, res){
  res.render('README.md', { layout: false });
};