'use strict';

var should = require('should');

var lib = require('pwabuilder-lib');
var validationConstants = lib.constants.validation;

var constants = require('../../lib/constants'),
    validation = require('../../lib/validationRules/wpRequiredAppIcon');

var validIconSizes = ['44x44', '62x62', '106x106'];
var manifestWithValidIconSizes = [{sizes : '44x44'}, {sizes : '62x62'}, {sizes : '106x106'}];

describe('Validation - Windows', function () {
  describe('wpRequiredAppIcon', function () {
    it('Should return a warning if manifest does not contains icons', function(done) {
      validation({}, function(err, warning) {
        should.not.exist(err);
        should.exist(warning);
        warning.should.have.property('platform', constants.platform.id);
        warning.should.have.property('level', validationConstants.levels.warning);
        warning.should.have.property('member', validationConstants.manifestMembers.icons);
        warning.should.have.property('code', validationConstants.codes.missingImageGroup);
        warning.should.have.property('data', validIconSizes);
        done();
      });
    });

    it('Should return a warning if manifest icons is empty', function(done) {
      validation({ icons: [] }, function(err, warning) {
        should.not.exist(err);
        should.exist(warning);
        warning.should.have.property('platform', constants.platform.id);
        warning.should.have.property('level', validationConstants.levels.warning);
        warning.should.have.property('member', validationConstants.manifestMembers.icons);
        warning.should.have.property('code', validationConstants.codes.missingImageGroup);
        warning.should.have.property('data', validIconSizes);
        done();
      });
    });

    it('Should return a warning if manifest icons does not contains the required sizes', function(done) {
      validation({ icons: [{sizes : '1x1'}] }, function(err, warning) {
        should.not.exist(err);
        should.exist(warning);
        warning.should.have.property('platform', constants.platform.id);
        warning.should.have.property('level', validationConstants.levels.warning);
        warning.should.have.property('member', validationConstants.manifestMembers.icons);
        warning.should.have.property('code', validationConstants.codes.missingImageGroup);
        warning.should.have.property('data', validIconSizes);
        done();
      });
    });

    it('Should not return a warning if manifest icons contains one of the required sizes', function(done) {
      validation({ icons: manifestWithValidIconSizes.slice(1,2) }, function(err, warning) {
        should.not.exist(err);
        should.not.exist(warning);
        done();
      });
    });

    it('Should not return a warning if manifest icons contains all of the required sizes', function(done) {
      validation({ icons: manifestWithValidIconSizes }, function(err, warning) {
        should.not.exist(err);
        should.not.exist(warning);
        done();
      });
    });

    it('Should not return a warning if manifest icons contains one of the required sizes and others at the end', function(done) {
      var icons = manifestWithValidIconSizes.slice(1,3);
      icons.push({sizes : '1x1'});
      validation({ icons: icons }, function(err, warning) {
        should.not.exist(err);
        should.not.exist(warning);
        done();
      });
    });

    it('Should not return a warning if manifest icons contains one of the required sizes and others at the begining', function(done) {
      var icons = [{sizes : '1x1'}];
      icons.push(manifestWithValidIconSizes[1]);

      validation({ icons: icons }, function(err, warning) {
        should.not.exist(err);
        should.not.exist(warning);
        done();
      });
    });
  });
});
