var spectrumApp = angular.module('spectrum', []);

/**
 * Gets the passed date in W3C format (eg: 2011-03-09T21:55:41Z).
 *
 * @param date the date.
 *
 * @return the date in W3C format.
 */
w3cDate = function(date) {
  function _zeroFill2(num) {
    return (num < 10) ? '0' + num : '' + num;
  }

  if(date === undefined || date === null) {
    date = new Date();
  }
  return '' + date.getUTCFullYear() + '-' +
    _zeroFill2(date.getUTCMonth() + 1) + '-' +
    _zeroFill2(date.getUTCDate()) + 'T' +
    _zeroFill2(date.getUTCHours()) + ':' +
    _zeroFill2(date.getUTCMinutes()) + ':' +
    _zeroFill2(date.getUTCSeconds()) + 'Z';
};


spectrumApp.controller('SpectrumBlockController', function($scope, $http) {
  var today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // initialize the spectrum block model with something sane
  $scope.model = {
    centerFrequency: '' + (50000000 + Math.floor((Math.random() * 850000) * 1000)),
    occupiedBandwidth: '' + (1000000 + Math.floor((Math.random() * 50000) * 1000)),
    transmitPower: '' + (5 + Math.floor(Math.random() * 80)),
    latitude: '' + (37.22 + Math.random()),
    longitude: '' + (80.41 + Math.random()),
    validFrom: w3cDate(today),
    validUntil: w3cDate(tomorrow)
  };

});

spectrumApp.controller('SpectrumListController', function($scope, $http) {
  $scope.model = {offers: []};

  $http.get('/offers/', {headers: {'Accept': 'application/ld+json'}})
    .success(function(data, status) {
      $scope.model.offers.length = 0;
      for(i in data) {
        var offer = data[i];
        $scope.model.offers.push(
          {'asset': offer['@graph'][0], 'listing': offer['@graph'][0]});
      }
  });
  
});
