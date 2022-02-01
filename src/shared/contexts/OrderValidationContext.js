import React, { useState, useEffect, useCallback } from 'react';

import { useMenuData, useOrderData } from '.';
import { ValidationError, useTranslation } from '../utils';

const OrderValidationContext = React.createContext({
  validation: { valid: true, errors: [] },
});

const OrderValidationProvider = ({ children }) => {
  const { dishObjectList } = useMenuData();
  const { dishListInOrder, coursesAmounts } = useOrderData();
  const { t } = useTranslation();

  const [validation, setValidation] = useState({ valid: true, errors: [] });
  const [validationRules, setValidationRules] = useState({});

  useEffect(() => {
    // this is run only at component render (component did mount)
    // Validation Configuration and Validation rules may be specific for Restaurant, hence these data may be loaded from a server side configuration
    // now data are stored manually
    const validationRules = {
      diners: 2,
      errors: [],
      courseLimits: {
        fixPerDiner: {
          mains: 1,
        },
        maxPerDiner: {
          mains: 1,
          starters: 1,
          desserts: 1,
        },
      },
      minCoursesPerDiner: 2,
    };
    setValidationRules(validationRules);
  }, []);

  // trigger validation on dish selection change
  useEffect(() => {
    const result = validate();
    setValidation(result);
  }, [dishListInOrder]);

  // run validation
  const validate = useCallback(() => {
    try {
      // apply validation rules
      const errors = [];

      // one main course per diner
      if (validationRules.courseLimits && validationRules.courseLimits.fixPerDiner) {
        const coursesWithFixPerDiner = Object.keys(validationRules.courseLimits.fixPerDiner);
        coursesWithFixPerDiner.forEach((course) => {
          const limit = validationRules.diners * validationRules.courseLimits.fixPerDiner[course];
          if (coursesAmounts[course] !== limit) {
            const message = t(`The total amount of dishes for course ${course} per diner must be ${limit}`);
            errors.push(message);
          }
        });
      }

      // each diner can not have more than one dish of the same course
      if (validationRules.courseLimits && validationRules.courseLimits.maxPerDiner) {
        const coursesWithMaxPerDiner = Object.keys(validationRules.courseLimits.maxPerDiner);
        coursesWithMaxPerDiner.forEach((course) => {
          const limit = validationRules.diners * validationRules.courseLimits.maxPerDiner[course];
          if (coursesAmounts[course] > limit) {
            const message = t(`Each diner can not have more than ${limit} dish/es for course ${course}`);
            errors.push(message);
          }
        });
      }

      // at least, two courses per diner
      if (validationRules.minCoursesPerDiner) {
        // find amount total different courses
        /**
         * !!! Warning !!!
         * The following approach is feasible only for a setup with 2 diners: with more diners, the possible combination will grow a lot
         * This is a temporary solution
         */
        const possibleCombinationsForTwoDiners = ['220', '202', '022', '211', '121', '112'];
        const amountString = Object.values(coursesAmounts).join('');
        if (!possibleCombinationsForTwoDiners.includes(amountString)) {
          const message = t(`Each diner must have at least dish/es from ${validationRules.minCoursesPerDiner} courses`);
          errors.push(message);
        }
      }

      dishListInOrder.forEach((dishInOrder) => {
        const menuDishInOrder = dishObjectList[dishInOrder];
        if (menuDishInOrder && menuDishInOrder.exclusions && menuDishInOrder.exclusions.length) {
          const checkIntersection = dishListInOrder.filter((x) => menuDishInOrder.exclusions.includes(x));

          if (checkIntersection && checkIntersection.length) {
            const intersectionDishNames = checkIntersection.map((dishId) => {
              return `"${dishObjectList[dishId].name}"`;
            });

            const message = t(
              `Dish "${menuDishInOrder.name}" cannot be selected together with Dish/es [${intersectionDishNames.join(
                ','
              )}]`
            );
            errors.push(message);
          }
        }
      });

      if (errors.length) {
        return { valid: false, errors };
      }

      return { valid: true, errors: [] };
    } catch (e) {
      if (e instanceof ValidationError) {
        return { valid: false, errors: [e.message] };
      }
      return { valid: false, errors: [t('Generic Error during validation')] };
    }
  }, [dishListInOrder, coursesAmounts]);

  return <OrderValidationContext.Provider value={{ validation }}>{children}</OrderValidationContext.Provider>;
};

const useOrderValidation = () => {
  const context = React.useContext(OrderValidationContext);
  if (!context) {
    throw new Error('Cannot use Order Validation outside a Order Validation Provider');
  }

  return context.validation;
};

export { useOrderValidation, OrderValidationProvider };
