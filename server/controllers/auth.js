/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Define = require('../config/define');
var logger = require('../config/logger');
var sha1 = require('sha1');

/**
 * @class Controller
 * @param {req} req request
 * @constructor
 */
var Auth = function (req) {
    this.models = req.models;
};

Auth.prototype.assertLoggedIn = function (req, res) {
    if (req.session.user && req.session.user.id)
        return true;
    res.status(Define.STATUS_NOT_ALLOWED).json({message: 'Access forbidden'});
};

Auth.prototype.signin = function (user, callback) {
    var model = this.models.rafm_staff;
    var entity = model.entity;
    try {
        entity.find({
            'email': user.email.toLowerCase(),
            'password': sha1(user.email.toLowerCase() + user.password)
        }, function (err, usr) {
            if (err) {
                logger.error("Error while finding " + model.modelName + " - " + user.email + ": ", err);
                callback(Define.STATUS_BAD_REQUEST, {message: err.code});
            } else if (!usr.length) {
                callback(Define.STATUS_BAD_REQUEST, {message: 'Incorrect username or password'});
            } else {
                if (!usr[0].is_active) {
                    callback(Define.STATUS_BAD_REQUEST, {message: 'Your account has been deactivated, please contact your system administrator'});
                    return;
                }
                usr[0].getUnit(function (err, unit) {
                    if (!err) {
                        delete usr[0].unit_id;
                        usr[0].unit = unit;
                    }
                    usr[0].getPosition(function (err, position) {
                        if (!err) {
                            delete usr[0].position_id;
                            usr[0].position = position;
                        }
                        callback(Define.STATUS_OK, usr[0]);
                    });
                });
            }
        });
    } catch (err) {
        logger.error("Error while finding " + model.modelName + " - " + user.email + ": ", err);
        callback(Define.STATUS_BAD_REQUEST, err);
    }
};

Auth.prototype.update = function (old_user, new_user, callback) {
    var model = this.models.rafm_staff;
    var entity = model.entity;
    if (new_user.change_password) {
        if (old_user.password !== sha1(new_user.email.toLowerCase() + new_user.old_pwd)) {
            callback(Define.STATUS_BAD_REQUEST, {message: 'The current password is incorrect'});
            return;
        }
        if (old_user.password === sha1(new_user.email.toLowerCase() + new_user.new_pwd)) {
            callback(Define.STATUS_BAD_REQUEST, {message: 'The current and the new passwords are similar'});
            return;
        }
    }
    entity.get(old_user.id, function (err, user) {
        if (err) {
            logger.error("Error while finding " + model.modelName + " - " + old_user.id + ": ", err);
            callback(Define.STATUS_BAD_REQUEST, err);
            return;
        }
        user.name = new_user.name;
        user.picture = new_user.picture;
        if (new_user.change_password)
            user.password = sha1(new_user.email.toLowerCase() + new_user.new_pwd);
        user.save(function (err) {
            if (err) {
                logger.error("Error while saving " + model.modelName + " - " + user + ": ", err);
                callback(Define.STATUS_BAD_REQUEST, err);
                return;
            }
            new_user.password = user.password;
            delete new_user.old_pwd;
            delete new_user.new_pwd;
            delete new_user.change_password;
            delete new_user.confirm_new_pwd;
            callback(Define.STATUS_OK, new_user);
        });
    });
};

module.exports = Auth;