import Control from './Control.js'
import Bar from './Bar.js'
import Button from './Button.js'
import TextBlock from './TextBlock.js'
import Grid from './Grid.js'
import Input from './Input.js'
import Label from './Label.js'
import MessageBox from './MessageBox.js'
import NumberInput from './NumberInput.js'
import BaseModal from './BaseModal.js'
import CheckBox from './CheckBox.js'
import ControlCreator from './ControlCreator.js'

var _instanceCreator=new ControlCreator()
Control.getInstance=function(){
    return _instanceCreator.newInstance(...arguments)
}
module.exports = {
    Bar,
    Button,
    TextBlock,
    Grid,
    Input,
    Label,
    MessageBox,
    NumberInput,
    BaseModal,
    CheckBox
}