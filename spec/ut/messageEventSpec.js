describe("Player", function() {
  var MessageEmitter = require('../../src/lib/MessageEmitter.js');

  var event;
  var isFunc1Trigger=false
  var isFunc2Trigger=false
  var isFunc3Trigger=false

  var testFunc1=function(){
    isFunc1Trigger=true
  }
  var testFunc2=function(){
    isFunc2Trigger=true
  }
  var testFunc3=function(){
    isFunc3Trigger=true
  }

  beforeEach(function() {
    event=new MessageEmitter()

  });

  it("attach a listiner", function() {
   
    event.on("test",testFunc1)
    event.on("test",testFunc2)
    event.on("test",testFunc3)

    expect(event.eventContainer[test].length).toEqual(3);
    expect(event.eventContainer[test][0]).toEqual(testFunc1);
    expect(event.eventContainer[test][1]).toEqual(testFunc2);
    expect(event.eventContainer[test][2]).toEqual(testFunc3);

    it("fire a event", function() {
      event.emit("test")
  
      expect(isFunc1Trigger).toEqual(true);
      expect(isFunc2Trigger).toEqual(true);
      expect(isFunc3Trigger).toEqual(true);
    });
  });



});
