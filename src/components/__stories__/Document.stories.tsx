import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Document from '../document';

export default {
  title: 'Document',
  component: Document,
  argTypes: {},
} as ComponentMeta<typeof Document>;

const Template: ComponentStory<typeof Document> = (args) => <Document {...args} />;

export const Normal = Template.bind({});
Normal.args = {
};

export const Asset = Template.bind({});
Asset.args = {
  primaryColor: "#BA4726",
  externalReferenceCode: "07dfc130-eb82-44ef-9783-fa7c9029066b",
  appId: "LEAVE",
  moduleId: "APPLICATION",
  baseURL: "http://localhost:8080/o",
  baseDomain: "localhost"
};

export const Request = Template.bind({});
Request.args = {
  primaryColor: "#58bde8",
  externalReferenceCode: "07dfc130-eb82-44ef-9783-fa7c9029066b",
  appId: "LEAVE",
  moduleId: "APPLICATION",
  baseURL: "http://localhost:8080/o",
  baseDomain: "localhost"
};
