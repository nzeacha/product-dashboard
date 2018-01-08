/*
 ImportCtrl
 */
pDashboard.controller('importController', function ($scope, toaster, $uibModal) {

    $scope.Working = function () {
        return $scope.bundle1Working || $scope.bundle2Working || $scope.bundle3Working || $scope.bundle4Working
                || $scope.bundle9Working || $scope.bundlesmsWorking || $scope.smscWorking || $scope.smscbyWorking || $scope.gprsWorking;
    };
    
    $scope.csmDropzoneConfig = {
        parallelUploads : 1,
        url:'import/csm',
        maxFiles: 10,
        acceptedFiles: ".xls, .xlsx, .csv",
        paramName: "file"
    };
    
    $scope.csmError = function(file, errormsg) {
        toaster.error('Error when uploading' + file.name, errormsg);
        $scope.csmDropzone.processQueue.bind($scope.csmDropzone);
    };
    
    $scope.csmSuccess = function(file, report) {
        console.log(file,report);
        $scope.csmDropzone.processQueue.bind($scope.csmDropzone);
    };
    
    

});