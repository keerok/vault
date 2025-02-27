import { hasMany, attr } from '@ember-data/model';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import IdentityModel from './_base';
import apiPath from 'vault/utils/api-path';
import attachCapabilities from 'vault/lib/attach-capabilities';

let Model = IdentityModel.extend({
  formFields: computed(function () {
    return ['name', 'disabled', 'policies', 'metadata'];
  }),
  name: attr('string'),
  disabled: attr('boolean', {
    defaultValue: false,
    label: 'Disable entity',
    helpText: 'All associated tokens cannot be used, but are not revoked.',
  }),
  mergedEntityIds: attr(),
  metadata: attr({
    editType: 'kv',
  }),
  policies: attr({
    label: 'Policies',
    editType: 'searchSelect',
    isSectionHeader: true,
    fallbackComponent: 'string-list',
    models: ['policy/acl', 'policy/rgp'],
  }),
  creationTime: attr('string', {
    readOnly: true,
  }),
  lastUpdateTime: attr('string', {
    readOnly: true,
  }),
  aliases: hasMany('identity/entity-alias', { async: false, readOnly: true }),
  groupIds: attr({
    readOnly: true,
  }),
  directGroupIds: attr({
    readOnly: true,
  }),
  inheritedGroupIds: attr({
    readOnly: true,
  }),
  canDelete: alias('updatePath.canDelete'),
  canEdit: alias('updatePath.canUpdate'),
  canRead: alias('updatePath.canRead'),
  canAddAlias: alias('aliasPath.canCreate'),
});

export default attachCapabilities(Model, {
  updatePath: apiPath`identity/entity/id/${'id'}`,
  aliasPath: apiPath`identity/entity-alias`,
});
