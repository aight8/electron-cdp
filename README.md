# electron-cdp

## Yarn scripts

| Script | Description |
|-|-|
| download | download the protocol definitions in json format and save it to the ```/downloads``` folder |
| bla | ga |

## Todo

add major/minor version to CDP class

check why module descriptions are not shown

smart-cdp which turn
- one parameter commands objects in to command which requires only this value
- same for events (returns only the value instead of an object with one property)
downside: more miggration / not strict API conform
nice: more elegant to use in the code
- singleton/static instance of CDP (only set the debugger once)
- make types accessable by typing "CDP.Schema.setSomething.Params"

type of deep nested object is not accessable for example EventProps
