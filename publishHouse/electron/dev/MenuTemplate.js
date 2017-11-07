const {dialog} = require('electron')

function CreateMenu (emitterMnager) {
  return [
    {
      label: '文件',
      submenu: [ {
        label: 'open',
        click: (menuItem, browserWindow, event) => {
          var filepath = dialog.showOpenDialog({
            filters: [{name: 'execute',extensions: ['dll', 'exe']}],
            properties: ['openFile']
          })

          if (filepath && filepath.length == 1)  emitterMnager.Trigger('openFile', filepath[0])
      }},
        {label: 'dump'},
        {label: 'exit'}
      ]
    },
    {
      label: '选项',
      submenu: [
        {label: 'Sort ByName',type: 'checkbox',checked: true,click: (menuItem, browserWindow, event) => {
            menuItem.checked = !menuItem.checked
        }},
        {label: 'Full ClassName',type: 'checkbox',checked: true,function: (menuItem, browserWindow, event) => {
        }},
        {label: 'Verbal CA blobs',type: 'checkbox',checked: true,function: (menuItem, browserWindow, event) => {
        }},
        {type: 'separator'},
        {label: 'Hide Public',type: 'checkbox',checked: true,function: (menuItem, browserWindow, event) => {
        }},
        {label: 'Hide Private',type: 'checkbox',checked: true,function: (menuItem, browserWindow, event) => {
        }},
        {label: 'Hide Family',type: 'checkbox',checked: true,function: (menuItem, browserWindow, event) => {
        }},
        {label: 'Hide Assembly',type: 'checkbox',checked: true,function: (menuItem, browserWindow, event) => {
        }},
        {label: 'Hide FamAndAssem',type: 'checkbox',checked: true,function: (menuItem, browserWindow, event) => {
        }},
        {label: 'Hide FamOrAssem',type: 'checkbox',checked: true,function: (menuItem, browserWindow, event) => {
        }},
        {label: 'Hide PrivateScope',type: 'checkbox',checked: true,function: (menuItem, browserWindow, event) => {
        }},
        {type: 'separator'},
        {label: 'Show member types',type: 'checkbox',function: (menuItem, browserWindow, event) => {
        }},
        {label: 'Show bytes',type: 'checkbox',function: (menuItem, browserWindow, event) => {
        }},
        {label: 'Show token values',type: 'checkbox',function: (menuItem, browserWindow, event) => {
        }},
        {label: 'Show Source line',type: 'checkbox',function: (menuItem, browserWindow, event) => {
        }},
        {label: 'Quote all names',type: 'checkbox',function: (menuItem, browserWindow, event) => {
        }},
        {label: 'Expand try/catch',type: 'checkbox',function: (menuItem, browserWindow, event) => {
        }},
        {label: 'Headers',function: (menuItem, browserWindow, event) => {
        }},
        {label: 'Statics',function: (menuItem, browserWindow, event) => {
        }},
        {label: 'MemberInfo',
          submenu: [
            {label: 'More HEX',type: 'checkbox',function: (menuItem, browserWindow, event) => {
            }},
            {type: 'separator'},
            {label: 'Raw:couts Sizes',type: 'checkbox',function: (menuItem, browserWindow, event) => {
            }},
            {label: 'Raw:header',type: 'checkbox',function: (menuItem, browserWindow, event) => {
            }},
            {label: 'Raw:header Scheme',type: 'checkbox',function: (menuItem, browserWindow, event) => {
            }},
            {label: 'Raw:header Scheme Rows',type: 'checkbox',function: (menuItem, browserWindow, event) => {
            }},
            {label: 'Raw Heaps',type: 'checkbox',function: (menuItem, browserWindow, event) => {
            }},
            {type: 'separator'},
            {label: 'Unresolve ext.',type: 'checkbox',function: (menuItem, browserWindow, event) => {
            }},
            {label: 'Validate',function: (menuItem, browserWindow, event) => {
            }},
            {label: 'Show',function: (menuItem, browserWindow, event) => {
            }}
          ]
        }
      ]
    }
  ]
}

export { CreateMenu as CreateMenu }
