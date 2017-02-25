﻿; (function () {
    "use strict";

    var messagePrefix = "NameSpace: ";

    window.ns = window.ns || {};
    window.ns.Node = Node;
    window.ns.Tree = Tree;

    var requiredNodeParams = [
        "name",
        "parent"
    ];

    var requiredTreeParams = [
    ];

    function Node(params) {
        var validation = window.ObjectValidator.validateProperties(params, requiredNodeParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;

        self.Name = params.name;
        self.Parent = params.parent;
        self.Children = [];

        self.Facade = { "__node__": self };

        self.ScopeTo = function (name) {
            var matchingChildren = $.grep(self.Children, function (node) { return node.Name == name });
            if (matchingChildren.length > 1)
                throw messagePrefix + "Node '" + self.Name + "' has multiple children called '" + name + "'";

            if (matchingChildren.length == 1)
                return matchingChildren[0];
            else {
                var newChild = new Node({ name: name, parent: self });
                self.Children.push(newChild);
                return newChild;
            }
        };
    };

    function Tree(params) {
        var validation = window.ObjectValidator.validateProperties(params, requiredTreeParams);
        if (!validation.isValid)
            throw messagePrefix + "Failed construction, missing parameter(s) " + validation.missingProperties.join(", ");
        var self = this;

        var nsTree = new window.ns.Node({ name: "root", parent: null });

        self.Traverse = function (nameSapceString) {
            if (!nameSapceString)
                throw messagePrefix + "cannot traverse namespace without a namespace string";

            var nameSpaceComponents = nameSapceString.split(".");
            var compententLength = nameSpaceComponents.length;

            var currentNode = nsTree;
            for (var index = 0; index < compententLength; index++)
                currentNode = currentNode.ScopeTo(nameSpaceComponents.shift());

            return currentNode.Facade;
        };
    };
})();