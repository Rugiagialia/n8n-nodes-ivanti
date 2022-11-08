import { INodeProperties } from 'n8n-workflow';

export const employeeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['employee'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an employee',
				action: 'Create an employee',
				routing: {
					request: {
						// baseURL: 'https://httpbin.org/anything',
						method: 'POST',
						url: '/employees',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an employee',
				action: 'Delete an employee',
				routing: {
					request: {
						// baseURL: 'https://httpbin.org/anything',
						method: 'DELETE',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve an employee',
				action: 'Get an employee',
				routing: {
					request: {
						method: 'GET',
						url: '/employees',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'value',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get Count',
				value: 'getCount',
				description: 'Retrieve a count of employees',
				action: 'Retrieve a count of employees',
				routing: {
					request: {
						method: 'GET',
						url: '/employees',
					},
					send: {
						type: 'query',
						property: '$top',
						value: '1',
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									count:
										'={{$responseItem["@odata.count"] == 0 ? 1 : $responseItem["@odata.count"] }}',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many employees',
				action: 'Get many employees',
				routing: {
					request: {
						method: 'GET',
						url: '/employees',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'value',
								},
							},
						],
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an employee',
				action: 'Update an employee',
				routing: {
					request: {
						// baseURL: 'https://httpbin.org/anything',
						method: 'PATCH',
					},
				},
			},
		],
		default: 'getAll',
	},
];

const getOperation: INodeProperties[] = [
	{
		displayName: 'ID Type',
		name: 'idType',
		type: 'options',
		options: [
			{
				name: 'Login ID',
				value: 'loginId',
			},
			{
				name: 'Primary Email',
				value: 'primaryEmail',
			},
			{
				name: 'Record ID',
				value: 'recId',
			},
		],
		default: 'recId',
		required: true,
		noDataExpression: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['employee'],
			},
		},
		description: 'Choose ID type from the list',
	},
	{
		displayName: 'Login ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['employee'],
				idType: ['loginId'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: '$filter',
				value: "=LoginID eq '{{ $value }}'",
			},
		},
		description: 'LoginID value of the employee (user) in Ivanti',
	},
	{
		displayName: 'Record ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['employee'],
				idType: ['recId'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: '$filter',
				value: "=RecId eq '{{ $value }}'",
			},
		},
		description: 'RecId value of the employee (user) in Ivanti',
	},
	{
		displayName: 'Primary Email',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['employee'],
				idType: ['primaryEmail'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: '$filter',
				value: "=PrimaryEmail eq '{{ $value }}'",
			},
		},
		description: 'PrimaryEmail value of the employee (user) in Ivanti',
	},
	{
		displayName: 'Query Parameters',
		name: 'queryParameters',
		type: 'collection',
		placeholder: 'Extend Query',
		default: {},
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Select Fields',
				name: 'select',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: '$select',
						value: '={{ $value !== "" ? $value : undefined }}',
					},
				},
				description: 'Include only these fields',
				placeholder: 'PrimaryEmail, RecId, Status, LoginID',
			},
		],
		description:
			'Send additional query parameters. More <a href="https://www.odata.org/getting-started/basic-tutorial/#queryData">information</a>.',
	},
];

const getCountOperation: INodeProperties[] = [
	{
		displayName: 'Query Parameters',
		name: 'queryParameters',
		type: 'collection',
		placeholder: 'Extend Query',
		default: {},
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['getCount'],
			},
		},
		options: [
			{
				displayName: 'Result Filter',
				name: 'filter',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: '$filter',
						value: '={{ $value !== "" ? $value : undefined }}',
					},
				},
				description: 'An expression which will filter the results',
				placeholder: "Status eq 'Active'",
			},
		],
		description:
			'Send additional query parameters. More <a href="https://www.odata.org/getting-started/basic-tutorial/#queryData">information</a>.',
	},
];

const getAllOperation: INodeProperties[] = [
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
				resource: ['employee'],
				operation: ['getAll'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: '$top',
				value: '={{ $value }}',
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Send Sort Parameters',
		name: 'sortOptions',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether the request has sorting parameters or not',
	},
	{
		displayName: 'Sort',
		name: 'sortUi',
		type: 'fixedCollection',
		placeholder: 'Add Sort Options',
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['getAll'],
				sortOptions: [true],
			},
		},
		typeOptions: {
			multipleValues: false,
		},
		default: {
			// -----------------------------
			// There is a bug (or a feature). You can't add defaults if multipleValues is set to false
			// -----------------------------
			// sortDetails: [
			// 	{
			// 		sortBy: 'CreatedDateTime',
			// 		orderBy: 'asc',
			// 	},
			// ],
		},
		options: [
			{
				displayName: 'Sort Options',
				name: 'sortDetails',
				values: [
					{
						displayName: 'Sort Key Name or ID',
						name: 'sortBy',
						type: 'options',
						options: [
							{
								name: 'Creation Time',
								value: 'CreatedDateTime',
							},
							{
								name: 'Last Modification Time',
								value: 'LastModDateTime',
							},
						],
						description:
							'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
						default: 'CreatedDateTime',
					},
					{
						displayName: 'Sort Order',
						name: 'orderBy',
						type: 'options',
						options: [
							{
								name: 'Ascending',
								value: 'asc',
							},
							{
								name: 'Descending',
								value: 'desc',
							},
						],
						default: 'desc',
						routing: {
							send: {
								type: 'query',
								property: '$orderby',
								value: '={{ $parent.sortBy }} {{ $value }}',
							},
						},
					},
				],
			},
		],
	},
	{
		displayName: 'Query Parameters',
		name: 'queryParameters',
		type: 'collection',
		placeholder: 'Extend Query',
		default: {},
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Result Filter',
				name: 'filter',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: '$filter',
						value: '={{ $value !== "" ? $value : undefined }}',
					},
				},
				description: 'An expression which will filter the results',
				placeholder: "Status eq 'Active'",
			},
			{
				displayName: 'Select Fields',
				name: 'select',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: '$select',
						value: '={{ $value !== "" ? $value : undefined }}',
					},
				},
				description: 'Include only these fields',
				placeholder: 'PrimaryEmail, RecId, Status, LoginID',
			},
			{
				displayName: 'Skip Records',
				name: 'skip',
				type: 'number',
				default: 100,
				typeOptions: {
					minValue: 1,
					// eslint-disable-next-line n8n-nodes-base/node-param-type-options-max-value-present
					maxValue: 100,
				},
				routing: {
					send: {
						type: 'query',
						property: '$skip',
						value: '={{ $value !== "" ? $value : undefined }}',
					},
				},
				description: 'Use this property when looping trough more than 100 results',
			},
		],
		description:
			'Send additional query parameters. More <a href="https://www.odata.org/getting-started/basic-tutorial/#queryData">information</a>.',
	},
];

const deleteOperation: INodeProperties[] = [
	{
		displayName: 'Record ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['delete'],
				resource: ['employee'],
			},
		},
		routing: {
			request: {
				url: "=/employees('{{ $value }}')",
			},
			output: {
				postReceive: [
					{
						type: 'setKeyValue',
						properties: {
							Result: 'Success',
						},
					},
				],
			},
		},
		description: 'RecId value of the employee (user) in Ivanti',
	},
];

const createOperation: INodeProperties[] = [
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['employee'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'FirstName',
			},
		},
		description: 'First name of the employee (user)',
	},
	{
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['employee'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'LastName',
			},
		},
		description: 'Last name of the employee (user)',
	},
	{
		displayName: 'Login Name',
		name: 'loginName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['employee'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'LoginID',
			},
		},
		description: 'Unique login name of the employee (user)',
	},
	{
		displayName: 'Email',
		name: 'primaryEmail',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['employee'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'PrimaryEmail',
			},
		},
		description: 'Unique primary email name ofemployee (user)',
	},
	{
		displayName: 'Use Predefined Fields',
		name: 'predefined',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['create'],
			},
		},
		default: false,
		description: 'Whether object creation requires more predefined prameters',
	},
	{
		displayName: 'Predefined Fields',
		name: 'predefinedFields',
		type: 'collection',
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['create'],
				predefined: [true],
			},
		},
		default: {},
		placeholder: 'Add Predefined Field',
		options: [
			{
				displayName: 'Auth (External)',
				name: 'isExtAuth',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'body',
						property: 'IsExternalAuth',
					},
				},
				description: 'Whether authentification method is external',
			},
			{
				displayName: 'Auth (Internal)',
				name: 'isIntAuth',
				type: 'boolean',
				default: true,
				routing: {
					send: {
						type: 'body',
						property: 'IsInternalAuth',
					},
				},
				description: 'Whether authentification method is internal',
			},
			{
				displayName: 'Display Name',
				name: 'displayName',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'DisplayName',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Display name of the employee (user)',
			},
			{
				displayName: 'Manager (ID)',
				name: 'manager',
				type: 'string',
				placeholder: '0014960452EE44259E8149C715B24DEF',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'ManagerLink_RecID',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'ID of the Manager of the employee (user)',
			},
			{
				displayName: 'Organizational Unit (ID)',
				name: 'orgUnitId',
				type: 'string',
				placeholder: '0014960452EE44259E8149C715B24DEF',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'OrgUnitLink_RecID',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which organization does the employee (user) belong to',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'InternalAuthPasswd',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Password of the employee (user)',
			},
			{
				displayName: 'Phone',
				name: 'primaryPhone',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'PrimaryPhone',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Primary phone of the employee (user)',
			},
			{
				displayName: 'Team',
				name: 'team',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Team',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which organization does the employee (user) belong to',
			},
		],
	},
	{
		displayName: 'Send Custom Fields',
		name: 'customFields',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['create'],
			},
		},
		default: false,
		description: 'Whether creating object requires more custom prameters',
	},
	{
		displayName: 'Custom Fields',
		name: 'customProperties',
		type: 'fixedCollection',
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['create'],
				customFields: [true],
			},
		},
		default: {
			property: [
				{
					name: '',
					value: '',
				},
			],
		},
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
						required: true,
						default: '',
						description: 'Name of the custom field to set',
					},
					{
						displayName: 'Field Value',
						name: 'value',
						type: 'string',
						required: true,
						default: '',
						routing: {
							send: {
								type: 'body',
								property: '={{$parent.name}}',
								value: '={{ $value !== " " ? $value : undefined }}',
							},
						},
						description: 'Value to set on the custom field',
					},
				],
			},
		],
	},
];

const updateOperation: INodeProperties[] = [
	{
		displayName: 'Record ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['update'],
				resource: ['employee'],
			},
		},
		routing: {
			request: {
				url: "=/employees('{{ $value }}')",
			},
		},
		description: 'RecId value of the employee (user) in Ivanti',
	},
	{
		displayName: 'Use Predefined Fields',
		name: 'predefined',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['update'],
			},
		},
		default: false,
		description: 'Whether object creation requires more predefined prameters',
	},
	{
		displayName: 'Predefined Fields',
		name: 'predefinedFields',
		type: 'collection',
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['update'],
				predefined: [true],
			},
		},
		default: {},
		placeholder: 'Add Predefined Field',
		options: [
			{
				displayName: 'Auth (External)',
				name: 'isExtAuth',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'body',
						property: 'IsExternalAuth',
					},
				},
				description: 'Whether authentification method is external',
			},
			{
				displayName: 'Auth (Internal)',
				name: 'isIntAuth',
				type: 'boolean',
				default: true,
				routing: {
					send: {
						type: 'body',
						property: 'IsInternalAuth',
					},
				},
				description: 'Whether authentification method is internal',
			},
			{
				displayName: 'Display Name',
				name: 'displayName',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'DisplayName',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Display name of the employee (user)',
			},
			{
				displayName: 'Email',
				name: 'primaryEmail',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'PrimaryEmail',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Unique primary email name ofemployee (user)',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'FirstName',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'First name of the employee (user)',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'LastName',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Last name of the employee (user)',
			},
			{
				displayName: 'Login Name',
				name: 'loginName',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'LoginID',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Unique login name of the employee (user)',
			},
			{
				displayName: 'Manager (ID)',
				name: 'manager',
				type: 'string',
				placeholder: '0014960452EE44259E8149C715B24DEF',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'ManagerLink_RecID',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'ID of the Manager of the employee (user)',
			},
			{
				displayName: 'Organizational Unit (ID)',
				name: 'orgUnitId',
				type: 'string',
				placeholder: '0014960452EE44259E8149C715B24DEF',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'OrgUnitLink_RecID',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which organization does the employee (user) belong to',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'InternalAuthPasswd',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Password of the employee (user)',
			},
			{
				displayName: 'Phone',
				name: 'primaryPhone',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'PrimaryPhone',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Primary phone of the employee (user)',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Status',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Status of the employee (user)',
			},
			{
				displayName: 'Team',
				name: 'team',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'Team',
						value: '={{ $value || undefined }}',
					},
				},
				description: 'Which organization does the employee (user) belong to',
			},
		],
	},
	{
		displayName: 'Send Custom Fields',
		name: 'customFields',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['update'],
			},
		},
		default: false,
		description: 'Whether creating object requires more custom prameters',
	},
	{
		displayName: 'Custom Fields',
		name: 'customProperties',
		type: 'fixedCollection',
		displayOptions: {
			show: {
				resource: ['employee'],
				operation: ['update'],
				customFields: [true],
			},
		},
		default: {
			property: [
				{
					name: '',
					value: '',
				},
			],
		},
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
						default: '',
						description: 'Name of the custom field to set',
					},
					{
						displayName: 'Field Value',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: '={{ $parent.name !== " " ? $parent.name : undefined}}',
								value: '={{ $value !== " " ? $value : undefined }}',
							},
						},
						description: 'Value to set on the custom field',
					},
				],
			},
		],
	},
];

export const employeeFields: INodeProperties[] = [
	...createOperation,
	...deleteOperation,
	...getAllOperation,
	...getOperation,
	...getCountOperation,
	...updateOperation,
];
