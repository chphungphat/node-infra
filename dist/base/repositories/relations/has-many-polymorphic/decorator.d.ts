import { IHasManyPolymorphicDefinition } from './types';
import { ValueOptionalExcept } from '../../../../common';
/**
 * Custom decorator to define a polymorphic `@hasManyPolymorphic` relationship
 *
 * @param targetModelGetter - A function to return the target model constructor
 * @param definition - Additional relation metadata
 *
 * @experimental
 */
export declare function hasManyPolymorphic(definition: ValueOptionalExcept<IHasManyPolymorphicDefinition, 'target'>): (decoratedTarget: Object, key: string) => void;
