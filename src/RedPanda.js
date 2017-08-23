require('isomorphic-fetch')

import Registry from './Registry'
import PromiseCollection from './PromiseCollection'
import RequestSequence from './RequestSequence'

/**
 * The RedPanda Api Center
 * @param {object} namedEntities The named request / request group registry
 */
class RedPanda {
  constructor () {
    // private
    let reg = new Registry()

    /**
     * Get request options
     *
     * @param {string|Array|object} key
     * @return {Array}
     */
    this.get = (key) => reg.get(key)

    /**
     * Name a request by options or an array of request options
     *
     * @param {string} key option name
     * @param {string|Array|object} value option value
     * @return {Array}
     */
    this.set = (key, value) => {
      reg.set(key, value)
      return this
    }

    /**
     * Flatten multi-level request stacks passed in
     *
     * @param {mixed} options
     * @return {Array}
     */
    this.flatten = (options) => reg.flatten(options)
  };

  /**
   * Send a request with options defined by name
   *
   * @param {string} requestName name of request that defined
   * @return {PromiseCollection}
   */
  /**
   * Send a request with options
   *
   * @param {object} requestOptions options of request, method is 'GET' by default
   * @return {PromiseCollection}
   */
  /**
   * Send a bulk of requests in parallels
   *
   * @param {array} requestOptionArray an array of request options or request name
   * @return {PromiseCollection}
   */
  send (requestOptions) {
    let promises = this.flatten(requestOptions).map((option) => option instanceof RequestSequence
      ? (new RequestSequence(option.items, this)).start()
      : fetch(option.url, option)
    )

    return new PromiseCollection(promises)
  };

  sequence(requestOptions) {
    return new RequestSequence(requestOptions, this)
  };

  resolve (value) {
    return Promise.resolve(value)
  };

  reject (error) {
    return Promise.reject(error)
  };

  waitAll (promises) {
    return Promise.all(promises)
  };
};

export default RedPanda
