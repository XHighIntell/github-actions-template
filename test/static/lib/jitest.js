

window.jitest = function() {
    var jitest = window.jitest; jitest = {};

    // class

    jitest.TestCase = function TestCase(param1) {

        if (this instanceof TestCase == false) return new TestCase(param1);

        /** @type HTMLElement */
        var element;
        /** @type jitest.TestCaseOption */
        var options;
        
        if (param1 instanceof HTMLElement == true) element = param1;
        if (typeof param1 == 'object') options = param1;
        


        // prototype
        /** @type jitest.TestCase */
        var prototype = TestCase.prototype;
        if (prototype.getPrivate == null) {
            /** @type {defineProperties<jitest.TestCase>} */
            var defineProperties = {
                status: {
                    get: function() { return this.getPrivate().status },
                    set: function(newValue) {
                        var _private = this.getPrivate();

                        _private.elementStatus.classList.remove('passed', 'failed', 'running');
                        _private.elementStatus.classList.add(newValue);
                        _private.status = newValue;
                    },
                },
                icon: {
                    get: function() { return this.getPrivate().icon },
                    set: function(newValue) {
                        var _private = this.getPrivate();
                        if (_private.icon) _private.elementIcon.classList.remove(_private.icon);
                        if (newValue) _private.elementIcon.classList.add(newValue);

                        _private.icon = newValue;
                    }
                },
                title: {
                    get: function() { return this.getPrivate().title; },
                    set: function(newValue) {
                        var _private = this.getPrivate();

                        _private.elementTitle.innerHTML = newValue;
                        _private.title = newValue;
                    }
                },
                run: {
                    get: function() { return this.getPrivate().run },
                    set: function(newValue) {
                        var _private = this.getPrivate();

                        _private.run = newValue;

                        if (newValue == null) _private.elementActionRun.style.display = 'none';
                        else _private.elementActionRun.style.display = '';
                    },
                },
                children: {
                    get: function() { return this.getPrivate().children.slice(); },
                    set: function() { throw new Error("'TestCase.children' cannot be assigned to -- it is read only") }
                },
                element: {
                    get: function() { return this.getPrivate().element },
                    set: function() { throw new Error("'TestCase.element' cannot be assigned to -- it is read only") }
                },
            }

            


            Object.defineProperties(prototype, defineProperties);

            // prototype methods
            

            prototype.getPrivate = function getPrivate() {
                if (getPrivate.symbol == null) getPrivate.symbol = Symbol('private');
                var private_symbol = getPrivate.symbol;

                if (this[private_symbol] == null) this[private_symbol] = {}; return this[private_symbol]
            }
            prototype.add = function(option) {
                var _private = this.getPrivate();
                var tcase = new jitest.TestCase(option);

                _private.children.push(tcase);
                _private.elementChildren.appendChild(tcase.element);
                _private.elementActionRunDescendants.style.display = '';


                return tcase;
            }
            prototype.start = function(descendants) {
                if (descendants == null) descendants = false;

                if (this.run && this.status != 'running') {

                    this.status = 'running';

                    try {
                        var o = this.run();

                        if (o == null || o.then == null) o = Promise.resolve(o);

                        o.then(() => this.status = 'passed')
                        .catch(() => { this.status = 'failed' });

                    } catch (ex) {
                        this.status = 'failed';
                        console.error(ex);
                    }
                    
                    
                }

                if (descendants == true) 
                    for (var i = 0; i < this.children.length; i++) this.children[i].start(true);                

            }
            

        }


        // setup
        /** @type jitest.TestCase */
        var _this; _this = this;
        var _private = _this.getPrivate();

        if (element == null) element = $(
`<div class="jit-testcase">
    <div class="panel1">
        <div class="status"></div>
        <div class="icon"></div>
        <div class="title"></div>
        <div class="actions">
            <div class="action action-run">Run</div>
            <div class="action action-run-descendants">Run Descendants</div>
        </div>
    </div>

    <div class="children"></div>
</div>`)[0];

        var $element = $(element);
        var $elementStatus = $element.find('.status');
        var $elementIcon = $element.find('.icon');
        var $elementTitle = $element.find('.title');
        var $elementActionRun = $element.find('.action-run').hide();
        var $elementActionRunDescendants = $element.find('.action-run-descendants').hide();
        var $elementChildren = $element.find('.children');

        if ($element.length == 0) $element = $(`<div class="jt-TestCase"></div>`);

        _private.children = [];
        _private.element = $element[0];
        _private.elementStatus = $elementStatus[0];
        _private.elementIcon = $elementIcon[0];
        _private.elementTitle = $elementTitle[0];
        _private.elementActionRun = $elementActionRun[0];
        _private.elementActionRunDescendants = $elementActionRunDescendants[0];
        _private.elementChildren = $elementChildren[0];

        // hande events
        $elementActionRun.click(function(ev) { _this.start() });
        $elementActionRunDescendants.click(function(ev) { _this.start(true) });


        if (options != null) {
            if (options.icon != null) _this.icon = options.icon;
            if (options.title != null) _this.title = options.title;
            if (options.children != null) options.children.forEach(function(item) { _this.add(item) });

            _this.run = options.run;
        }

    }


    return jitest;
}();