const User = require('mongoose').model('User');

module.exports = {

  // get a user by id from the service
  index(request, response) {
    User.find ({ _id: request.params.id})
      .then(data => {
        response.json(data)
      })
      .catch(error => response.json(error));
  },

  login(request, response) {
    const { email, password } = request.body;
    User.findOne({ email })
      .then(async user => {
        const valid = await User.validatePassword(password, user.password);
        if (!valid) {
          throw new Error('Passwords do not match');
        }
         //handle login
        completeLogin(request, response, user);
      })
      .catch(error => {
        console.log('error message', error.message);
        response.status(403).json({ error: 'user/password not found' });
      });
  },


  register(request, response) {
    // console.log('registering user', request.body);
    User.create(request.body)
    .then(user => {
      // handle login
      completeLogin(request, response, user);
    })
    .catch(console.log);
    },
    logout(request, response) {
      // console.log('logging out...');
    //clear session
      request.session.destroy();
    //clear cookies
      response.clearCookie('userID', { path: '/' });
      response.clearCookie('expiration', { path: '/' });
      response.json(true);
  }
};

function completeLogin(request, response, user) {
  //save user to session
  request.session.user = user.toObject();
  //make sure password isn't saved in session
  delete request.session.user.password;
  delete request.session.user.confirmpassword;
  // console.log('hello there', request.session.user);

  //set cookies
  response.cookie('userID', user._id.toString());
  response.cookie('expiration', Date.now() + 86400 * 1000);
  response.json(user);
}
