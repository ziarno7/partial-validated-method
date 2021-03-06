PartialValidatedMethod = function PartialValidatedMethod(partialMethodOptions) {

  function PartialValidatedMethodMixin(methodOptions) {

    _.keys(partialMethodOptions).forEach(function (key) {

      //both have the same key - must combine
      if (_.has(methodOptions, key)) {

        //function - wrap it
        if (_.isFunction(partialMethodOptions[key])) {
          if (!_.isFunction(methodOptions[key])) {
            throw new Error ('PartialValidatedMethod: Types of ' + key + ' don\'t match!');
          }
          (function (originalFunction) {
            methodOptions[key] = function () {
              partialMethodOptions[key].apply(this, arguments);
              return originalFunction.apply(this, arguments);
            };
          })(methodOptions[key]);

        //array - concat
        } else if (_.isArray(partialMethodOptions[key])) {
          if (!_.isArray(methodOptions[key])) {
            throw new Error ('PartialValidatedMethod: Types of ' + key + ' don\'t match!');
          }
          methodOptions[key] = methodOptions[key].concat(partialMethodOptions[key]);

        //object - extend
        } else if (_.isObject(partialMethodOptions[key])) {
          if (!_.isObject(methodOptions[key])) {
            throw new Error ('PartialValidatedMethod: Types of ' + key + ' don\'t match!');
          }
          _.extend(methodOptions[key], partialMethodOptions[key]);

        //throw - only functions, arrays and objects can be combined
        } else {
          throw new Error('PartialValidatedMethod: Only functions, arrays and objects can be combined (at key ' + key + ')');
        }

      //no methodOptions[key] -
      //just assign partialMethodOptions[key];
      } else {
        methodOptions[key] = partialMethodOptions[key];
      }

    });

    return methodOptions;
  }

  return PartialValidatedMethodMixin;
};