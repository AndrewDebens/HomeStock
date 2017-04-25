﻿; (function () {
    "use strict";

    var nsString = "Data.Archives.WebAPI", ns = HomeStock.Import(nsString); 
    var nsCoreString = "Data.Archives.Core", nsCore = HomeStock.Import(nsCoreString);
    var nsOperatorString = "Data.Archives.WebAPI.Operators", nsOperator = HomeStock.Import(nsOperatorString);
    var nsUtilString = "Util", nsUtil = HomeStock.Import(nsUtilString);
    
    ns.Export("Archive", Archive);
    var messagePrefix = nsString + ".Archive: ";
    
    function Archive(params, protectedData) {
        this.validate(params, "endPoint");
        protectedData = protectedData || {};
        protectedData.self = protectedData.self || this;

        new nsCore.Archive(params, protectedData);
        var self = protectedData.self;

        self.Endpoint = params.endPoint;

        var ajaxAssistant = params.ajaxAssistant || new nsUtil.AjaxAssistant();
        var urlFormatter = params.urlFormatter || new ns.UrlFormatter();

        protectedData.Read = function (params) {
            var restrictions = params.restrictions || {};
            var url = urlFormatter.Format({ url: self.Endpoint.url, fragments: self.Endpoint.endPointFragments, constraintData: restrictions });
            if (!url)
                return new HomeStock.Deferred().resolve([]).promise();

            return ajaxAssistant.Request({
                url: url,
                type: "GET",
                success: params.success,
                error: params.error
            });
        };

        protectedData.Write = function (recordSet) {
            var restrictions = params.restrictions || {};

            var requests = [];
            for (var index = 0; index < recordSet.length; index++) {
                var data = recordSet.Records()[index];
                if (!data)
                    return new HomeStock.Deferred().reject({ responseText: messagePrefix + "Failed Write, missing data to write" }).promise();
                var url = urlFormatter.Format({ url: self.Endpoint.url, fragments: self.Endpoint.endPointFragments, constraintData: restrictions });
                if (!url)
                    return new HomeStock.Deferred().reject({ responseText: messagePrefix + "Failed Write, cannot to format URL" }).promise();

                //TODO: Validate restrictions against URL

                requests.push(ajaxAssistant.Request({
                    url: url,
                    type: "POST",
                    data: data,
                    success: params.success,
                    error: params.error
                }));
            }

            return $.when.apply($, requests);
        };

        protectedData.Remove = function (recordSet) {
            var restrictions = params.restrictions || {};

            var requests = [];
            for (var index = 0; index < recordSet.length; index++) {
                var data = recordSet.Records()[index];
                if (!data)
                    return new HomeStock.Deferred().reject({ responseText: messagePrefix + "Failed Remove, missing data to remove" }).promise();
                var url = urlFormatter.Format({ url: self.Endpoint.url, fragments: self.Endpoint.endPointFragments, constraintData: restrictions });
                if (!url)
                    return new HomeStock.Deferred().reject({ responseText: messagePrefix + "Failed Remove, cannot to format URL" }).promise();

                //TODO: Validate restrictions against URL

                requests.push(ajaxAssistant.Request({
                    url: url,
                    type: "DELETE",
                    success: params.success,
                    error: params.error
                }));
            }

            return $.when.apply($, requests);
        };

        return self;
    };
})();