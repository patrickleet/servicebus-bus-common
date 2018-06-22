const bus = require('bus')

const {
  makeBus,
  handleError,
  throwErr
} = bus

jest.mock('servicebus', () => {
  return {
    bus: () => {
      return {
        use: jest.fn(),
        logger: jest.fn(),
        package: jest.fn(),
        correlate: jest.fn()
      }
    }
  }
})
jest.mock('servicebus-retry')

describe('lib/bus', () => {
  it('should make a bus when makeBus is called', () => {
    expect(handleError).toBeDefined()
    expect(makeBus).toBeDefined()
    expect(throwErr).toBeDefined()

    let bus = makeBus()
    expect(bus).toMatchSnapshot()
  })

  it('should throw an error when throwErr is called', () => {
    expect(()=>{
      throwErr(new Error('OMG'))
    }).toThrow() 
  })

  it('should handle an error with handleError is called', () => {
    expect(()=>{
      handleError('msg', 'err')
    }).toThrow()
  })

})
