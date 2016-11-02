/**
 * Bernd Wessels (https://github.com/BerndWessels/)
 *
 * Copyright © 2016 Bernd Wessels. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Export action types.
 */
export const NEXT = 'NEXT';
export const PREVIOUS = 'PREVIOUS';

/**
 * Export action creators.
 */
export const nextStepCreator = () => ({type: NEXT});
export const prevStepCreator = () => ({type: PREVIOUS});