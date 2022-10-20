import { INodeProperties } from 'n8n-workflow';

export const eventDescription: INodeProperties[] = [
	{
		// ----------------------------------
		//         event
		// ----------------------------------

		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['event'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an event',
				action: 'Create an event',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve an event',
				action: 'Get an event',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many events',
				action: 'Get many events',
			},
		],
		default: 'getAll',
	},

	// ----------------------------------
	//         event:getAll
	// ----------------------------------

	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			// eslint-disable-next-line n8n-nodes-base/node-param-type-options-max-value-present
			maxValue: 100,
		},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['getAll'],
				// returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         event:get
	// ----------------------------------
	{
		displayName: 'Number',
		name: 'number',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['event'],
			},
		},
	},

	// ----------------------------------
	//         event:create
	// ----------------------------------

	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['event'],
			},
		},
	},
	{
		displayName: 'Notes',
		name: 'notes',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['event'],
			},
		},
	},
	{
		displayName: 'Source',
		name: 'source',
		type: 'options',
		options: [
			{
				name: 'ImmyBot',
				value: 'ImmyBot',
			},
			{
				name: 'Mail',
				value: 'Mail',
			},
			{
				name: 'Zabbix',
				value: 'Zabbix',
			},
		],
		default: 'ImmyBot',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['event'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['create'],
			},
		},
		default: {},
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Outage?',
				name: 'IsOutage',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Unread?',
				name: 'IsUnRead',
				type: 'boolean',
				default: true,
			},
			{
				displayName: 'Employee ID',
				name: 'CustomerLink_RecID',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Owner Team',
				name: 'OwnerTeam',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Start Date Time',
				name: 'EventStartDateTime',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'CI Name',
				name: 'CIName',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Support Hours',
				name: 'SupportHours',
				type: 'options',
				options: [
					{
						name: '9x5',
						value: '9x5',
					},
					{
						name: '24x7',
						value: '24x7',
					},
				],
				default: '9x5',
			},
			{
				displayName: 'Severity',
				name: 'Severity',
				type: 'options',
				options: [
					{
						name: 'Low',
						value: 'Low',
					},
					{
						name: 'Medium',
						value: 'Medium',
					},
					{
						name: 'High',
						value: 'High',
					},
				],
				default: 'Low',
			},
			{
				displayName: 'Custom Fields',
				name: 'customProperties',
				type: 'fixedCollection',
				default: {},
				placeholder: 'Add Custom Field',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'property',
						displayName: 'Custom Field',
						values: [
							{
								displayName: 'Field Name or ID',
								name: 'name',
								type: 'string',
								// type: 'options',
								// typeOptions: {
								// 	loadOptionsMethod: 'loadGroupCustomFields',
								// },
								default: '',
								description:
									'Name of the custom field to set. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
							},
							{
								displayName: 'Field Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Value to set on the custom field',
							},
						],
					},
				],
			},
		],
	},
];
