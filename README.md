# electron-cdp

[![CircleCI](https://circleci.com/gh/aight8/electron-cdp/tree/master.png?circle-token=84c03852ab9fbf2b54cfb49e919fc3addc8342c3&style=shield)]()
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

## Yarn scripts

| Script | Description |
|-|-|
| download | download the protocol definitions in json format and save it to the ```/downloads``` directory |
| build | runs the generate and build:generated command |
| generate | Generate the typescript source to ```generated-ts/``` |
| build:generated | Compile the generated source from ```generated-ts/``` to ```build/``` |
| test | Run tests |

## TODO

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
