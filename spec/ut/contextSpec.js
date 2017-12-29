describe("Player", function() {
    var context = require('../../src/lib/common/context.js');
  
    class UiObjectManager {
        constructor() {
            this.uiRoot = []
        }
        addView(element) {
            this.uiRoot.push(element)
            this.uiRoot.sort((a,b)=>a.zIndex-b.zIndex)
        }
        removeView(element) {
            if (!element) return
            element.destroy()
            util.removeArr(this.uiRoot, element)
        }
        forEach(func) {
            for (var index = 0; index < this.uiRoot.length; index++) {
                func(this.uiRoot[index])
            }
        }
    }
    
    var view1={zIndex:1}
    var view2={zIndex:2}
    var view3={zIndex:3}
  
    it("add view and sort", function() {
     
     context.UiObjectManager.addView(view1)
     context.UiObjectManager.addView(view2)
     context.UiObjectManager.addView(view3)

     expect( context.UiObjectManager.uiRoot[0]).toEqual(view3);
     expect( context.UiObjectManager.uiRoot[1]).toEqual(view2);
     expect( context.UiObjectManager.uiRoot[2]).toEqual(view1);

     it("remove view", function() {
        
        context.UiObjectManager.removeView(view1)
        context.UiObjectManager.addVremoveViewiew(view2)

        expect( context.UiObjectManager.uiRoot.length).toEqual(1);
        expect( context.UiObjectManager.uiRoot[0]).toEqual(view3);
        
       });
     
    });
  
  
  
  });
  