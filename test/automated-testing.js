/** @type jitest.TestCaseOption[] */
var cases = [];

// EventRegister
!function() {
    /** @type jitest.TestCaseOption */
    var o = {
        title: 'EventRegister', icon: 'class', children: [], run: function() {
            return new intell.EventRegister();
        }
    };
    
    
    o.children.push({
        title: 'addListener', icon: 'method', run: function() {
            var register = new intell.EventRegister();

            var value = 0;
            register.addListener(function() { value += 1; return "stop" });
            register.addListener(function() { value += 1 });

            register.dispatch();

            if (value == 1) return true;
            else throw new Error('bug');
        }
    });

    o.children.push({
        title: 'dispatch', icon: 'method', run: function() {
            var register = new intell.EventRegister();

            var value = 0;
            register.addListener(function(e) { value += e });

            register.dispatch(2);
            register.dispatch(4);

            if (value == 6) return true;
            else throw new Error('bug');
        }
    });

    o.children.push({
        title: 'removeListener', icon: 'method', run: function() {
            var register = new intell.EventRegister();
            
            var listener1 = function() { };
            var listener2 = function() { };

            register.addListener(listener1);
            register.addListener(listener2);

            if (register.hasListeners() !== true) throw new Error('Bug');
            if (register.listeners.length !== 2) throw new Error('Bug');

            register.removeListener(listener1);
            if (register.hasListener(listener1) !== false) throw new Error('Bug');
            if (register.hasListener(listener2) !== true) throw new Error('Bug');
            if (register.listeners[0] !== listener2) throw new Error('Bug');
        },
    });

    cases.push(o);
}()

// intell.createOnOff
!function() {
    /** @type jitest.TestCaseOption */
    var o = {
        title: 'createOnOff', icon: 'method', children: [], run: function() {

            return new Promise(function(resolve, reject) {

                var value = 0;

                /** @type intell.OnOffEventTarget */
                var target = new EventTarget();

                intell.createOnOff(target);

                target.on('click', 'aaa', function() { value += 1 });

                target.dispatchEvent(new Event('click', { bubbles: true }));
                target.off('aaa')
                target.dispatchEvent(new Event('click', { bubbles: true }));

                setTimeout(function() {
                    if (value == 1) resolve()
                    else reject();
                }, 500);
            });
            


            //return new intell.EventRegister();
        }
    };

    cases.push(o);
}()

// intell.get
!function() {
    /** @type jitest.TestCaseOption */
    var o = {
        title: 'createOnOff', icon: 'method', children: [], run: function() {

            return new Promise(function(resolve, reject) {

                var value = 0;

                /** @type intell.OnOffEventTarget */
                var target = new EventTarget();

                intell.createOnOff(target);

                target.on('click', 'aaa', function() { value += 1 });

                target.dispatchEvent(new Event('click', { bubbles: true }));
                target.off('aaa')
                target.dispatchEvent(new Event('click', { bubbles: true }));

                setTimeout(function() {
                    if (value == 1) resolve()
                    else reject();
                }, 500);
            });



            //return new intell.EventRegister();
        }
    };

    cases.push(o);

}();


!function() {
    var $runAll = $(document).find('.action-run-all');
    var $tree = $('#test-tree');


    var testCases = cases.map(function(item) {
        var tcase = new jitest.TestCase(item);
        $tree.append(tcase.element);

        return tcase;
    });

    
    

    $runAll.click(function() {
        testCases.forEach(function(testCase) { testCase.start(true) });
    });

}()

