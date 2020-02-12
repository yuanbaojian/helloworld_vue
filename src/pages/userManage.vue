<template>
  <div>
		<!-- begin page-header -->
		<h1 class="page-header">权限管理</h1>
		<!-- end page-header -->
		<!-- begin panel 
		:sort-options="{
				enabled: false,
			}"
		-->
		<panel title="用户一览">
			<vue-good-table
			mode="remote"
			@on-page-change="onPageChange"
			@on-sort-change="onSortChange"
			@on-column-filter="onColumnFilter"
			@on-per-page-change="onPerPageChange"
			@on-row-click="onRowClick"
			@on-selected-rows-change="selectionChanged"
			:totalRows="totalRecords"
			:isLoading.sync="isLoading"
			:sort-options="{
				enabled: true,
			}"
			:selectOptions="{
				enabled: true,
				selectOnCheckboxOnly: false, // only select when checkbox is clicked instead of the row
				selectionInfoClass: 'custom-class',
				selectionText: '行已选择',
				clearSelectionText: '清除',
				disableSelectInfo: false, // disable the select info panel on top
			}"
			:pagination-options="{
				enabled: true,
				perPageDropdown: [10, 20, 30],
				dropdownAllowAll: false,
				nextLabel: '下一页',
				prevLabel: '上一页',
				rowsPerPageLabel: '每页显示',
			}"
			:rows="rows"
			:columns="columns"
			styleClass="table table-hover table-bordered"

  >
  <!-- table-striped -->
				<template slot="table-row" slot-scope="props">
					<!-- <span v-if="props.column.field == 'userFullName'">
						<span style="font-weight: bold; color: blue;">{{props.row.userFullName}}</span>
					</span>
					<span v-else>
     					 {{props.formattedRow[props.column.field]}}
    				</span> -->
					<span v-if="props.column.field == 'operation'">
						 <a href="#" @click.prevent="showUserSaveModal(props.row)" class="fa fa-edit   m-r-15" title="编辑"></a>
						 <a href="#" @click.prevent ="deleteUser(props.row)" class="fa fa-trash" title="删除"></a>
					</span>
				</template>
				<div class="pull-right" slot="table-actions">
					<b-button @click="showUserSaveModal(null)" class="btn btn-primary fa fa-plus m-r-15">新增用户</b-button>
					<button @click="assignRole" type="button" class="btn btn-primary fa fa-users m-r-15">分配角色</button>
					<button @click="resetPassword" type="button" class="btn btn-primary fa fa-cog m-r-15">重置密码</button>
					<button @click="forbidden" type="button" class="btn btn-primary fa fa-lock m-r-15">禁用</button>
					<button @click="activate" type="button" class="btn btn-primary fa fa-unlock  m-r-15">启用</button> 
				</div>
				 <!-- <div slot="selected-row-actions">
					</div> -->
				 <!-- <div slot="table-actions-bottom">
					This will show up on the bottom of the table. 
				</div>
				<div slot="emptystate">
					This will show up when there are no rows
				</div> -->
			</vue-good-table>
		</panel>
		<b-modal id="newUser" size="lg" 
		:no-close-on-backdrop="true">
		    <template v-slot:modal-title>
			<span v-show="newUserTitle"><i class="btn btn-primary btn-xs fa fa-plus"></i>新增用户</span>
			<span v-show="editUserTitle"><i class="btn btn-primary btn-xs fa fa-edit"></i>修改用户</span>
			</template>
			<!-- <div class="d-block text-center">
			<h3>Hello From This Modal!</h3>
			</div>
			<b-button class="mt-3" block @click="$bvModal.hide('newUser')">Close Me</b-button>
			<b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
      		<b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Toggle Me</b-button> -->
			  <form>
							<div class="form-group row m-b-15">
								<label  class="labelStyle col-md-3 col-form-label"><span class="required" style="color:red"> * </span>用&ensp;户&ensp;名:</label>
								<div class="col-md-7">
									<input v-model="userFrom.loginName" type="text" class="form-control" placeholder="用户登录时的账号" :readonly="status ? false : 'readonly'"/>
								</div>
							</div>
							<div class="form-group row m-b-15">
								<label  class="labelStyle col-md-3 col-form-label"><span class="required" style="color:red"> * </span>用户姓名:</label>
								<div class="col-md-7">
									<input v-model="userFrom.userFullName" type="text" class="form-control" placeholder="用户真实姓名" />
								</div>
							</div>
						<div class="form-group row m-b-15">
							<label class="labelStyle col-form-label col-md-3"><span class="required" style="color:red"> * </span>密&ensp;&ensp;&ensp;&ensp;级:</label>
							<div class="col-md-7">
								<b-form-select  v-model="userFrom.securityLevel" :options="options" class="form-control">
								</b-form-select>
							</div>
						</div>
						<div class="form-group row m-b-15">
								<label class="labelStyle col-md-3 col-form-label">&ensp;&ensp;联系方式:</label>
								<div class="col-md-7">
									<input v-model="userFrom.mobilePhone" type="text" class="form-control" placeholder="电话号码" />
								</div>
							</div>
							<div class="form-group row m-b-15">
								<label class="labelStyle col-md-3 col-form-label">&ensp;&ensp;邮&ensp;&ensp;&ensp;&ensp;箱:</label>
								<div class="col-md-7">
									<input v-model="userFrom.email" type="text" class="form-control" placeholder="电子邮箱" />
								</div>
							</div>
						<!-- <div class="form-group row m-b-10">
							<label class="labelStyle col-md-3 col-form-label">&ensp;&ensp;复选按钮:</label>
							<div class="col-md-9">
								<div class="checkbox checkbox-css checkbox-inline">
									<input type="checkbox" value="" id="inlineCssCheckbox1" checked />
									<label for="inlineCssCheckbox1">Checkbox Label 1</label>
								</div>
								<div class="checkbox checkbox-css checkbox-inline">
									<input type="checkbox" value="" id="inlineCssCheckbox2" />
									<label for="inlineCssCheckbox2">Checkbox Label 2</label>
								</div>
							</div>
						</div>
						<div class="form-group row m-b-10">
							<label class="labelStyle col-md-3 col-form-label">&ensp;&ensp;单选按钮:</label>
							<div class="col-md-9">
								<div class="radio radio-css radio-inline">
									<input type="radio" name="radio_css_inline" id="inlineCssRadio1" value="option1" checked />
									<label for="inlineCssRadio1">Radio option 1</label>
								</div>
								<div class="radio radio-css radio-inline">
									<input type="radio" name="radio_css_inline" id="inlineCssRadio2" value="option2" />
									<label for="inlineCssRadio2">Radio option 2</label>
								</div>
							</div>
						</div>
						<div class="form-group row m-b-15">
							<label  class="labelStyle col-form-label col-md-3">&ensp;&ensp;备&ensp;&ensp;&ensp;&ensp;注:</label>
							<div class="col-md-7">
								<textarea class="form-control" rows="4"></textarea>
							</div>
						</div> -->
					</form>
			 <template v-slot:modal-footer>
					<button type="button" class="btn btn-default" @click="$bvModal.hide('newUser')">取消</button>
					<button type="button" class="btn btn-primary" @click="addUser">确认</button>
			</template>
		</b-modal>
		<!-- end panel -->
	</div>
</template>

<script>
export default {
	inject:['reload'],
    data(){
        return{
			isLoading: false,
			newUserTitle:false,
			editUserTitle:false,
			status:true,
            columns: [{
				label: '用户名',
				field: 'loginName',
				 filterOptions: {
					enabled: true, // enable filter for this column
					placeholder: '搜索账号', // placeholder for filter input
					trigger: 'enter', //only trigger on enter not on keyup 
					},
				width: '10%',
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			}, {
				label: '姓名',
				field: 'userFullName',
				 filterOptions: {
					enabled: true, // enable filter for this column
					placeholder: '搜索姓名', // placeholder for filter input
					trigger: 'enter', //only trigger on enter not on keyup 
					},
				width: '10%',
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			}, {
				label: '角色',
				field: 'userRoles',
				sortable: false,
				formatFn: this.formatRoleName,
				width: '10%',
				 filterOptions: {
					enabled: true, // enable filter for this column
					placeholder: '搜索角色', // placeholder for filter input
					trigger: 'enter', //only trigger on enter not on keyup 
					},
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			}, {
				label: '密级',
				field: 'securityLevel',
				formatFn: this.formatLevel,
				 filterOptions: {
					enabled: true, // enable filter for this column
					placeholder: '搜索密级', // placeholder for filter input
					trigger: '', //only trigger on enter not on keyup 
					},
				width: '10%',
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			}, {
				label: '状态',
				field: 'statusName',
				 filterOptions: {
					enabled: true, // enable filter for this column
					placeholder: '搜索状态', // placeholder for filter input
					trigger: 'enter', //only trigger on enter not on keyup 
					},
				width: '10%',
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			}, {
				label: '联系方式',
				field: 'mobilePhone',
				 filterOptions: {
					enabled: true, // enable filter for this column
					placeholder: '搜索电话', // placeholder for filter input
					trigger: 'enter', //only trigger on enter not on keyup 
					},
				width: '15%',
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			},{
				label: '邮箱',
				field: 'email',
				sortable: false,
				 filterOptions: {
					enabled: true, // enable filter for this column
					placeholder: '搜索邮箱', // placeholder for filter input
					trigger: 'enter', //only trigger on enter not on keyup 
					},
				width: '15%',
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'

			},{
				label: '更新时间',
				field: 'updateTime',
				 filterOptions: {
					enabled: true, // enable filter for this column
					placeholder: '更新时间', // placeholder for filter input
					trigger: 'enter', //only trigger on enter not on keyup 
					},
				width: '10%',
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			},{
				label: '操作',
				width: '10%',
				field: 'operation',
				tdClass: 'text-center text-nowrap',
				thClass: 'text-center text-nowrap'
			}],
			rows: [],
			totalRecords: 0,
			serverParams: {
			// a map of column filters example: {name: 'john', age: '20'}
			columnFilters: {
			},
			sort: {
				field: 'updateTime', 
				type: 'desc',
			},
			page: 1, 
			perPage: 10
			},
			userFrom:{
			userId:null,
			loginName:'',
			userFullName:'',
			securityLevel:null,
			mobilePhone:'',
			email:''
			},
			options: [
		  { value: null, text: '请选择密级'},
          { value: 0, text: '公开' },
          { value: 1, text: '内部' },
          { value: 2, text: '秘密' },
          { value: 3, text: '机密' },
          { value: 4, text: '绝密'}
        ],
        };
	},
	
    methods:{
		//对角色数组进行处理，去除角色名称
		formatRoleName: function(data) {
			let roleNames = '';
			if(data.length != 0){
			let i = data.length;
			if(data[0].roleName != undefined){
			for(let item of data){
				roleNames += item.roleName;
				i--;
				if(i!=0){
				 roleNames+= "，"; 
				 }
			}
			}
			}
			return roleNames;
		},
		//对密级格式化
		formatLevel:function(data){
			let level = '';
			switch (data) {
				case 0:
					level = "公开";
					break;
				case 1:
					level = "内部";
					break;
				case 2:
					level = "秘密";
					break;
				case 3:
					level = "机密";
					break;
				case 4:
					level = "绝密";
					break;
			}
			return level;
		},
		onRowClick(params) {
			// params.row - row object 
			// params.pageIndex - index of this row on the current page.
			// params.selected - if selection is enabled this argument 
			// indicates selected or not
			// params.event - click event
			console.log(params);
		  },
		  
		//弹出新增编辑模态框
		showUserSaveModal:function(row){
			if(row == null){//新增用户
				this.userFrom.userId = null
				this.userFrom.loginName = ''
				this.userFrom.userFullName = ''
				this.userFrom.securityLevel = null
				this.userFrom.mobilePhone = ''
				this.userFrom.email = ''
				this.newUserTitle = true
				this.editUserTitle = false
				this.status = true
				this.$bvModal.show('newUser')
			}else{//编辑用户
				this.userFrom.userId = row.userId
				this.userFrom.loginName = row.loginName
				this.userFrom.userFullName = row.userFullName
				this.userFrom.securityLevel = row.securityLevel
				this.userFrom.mobilePhone = row.mobilePhone
				this.userFrom.email = row.email
				this.editUserTitle = true
				this.newUserTitle = false
				this.status = false
				this.$bvModal.show('newUser')	
			}
		},
		//新增或编辑用户
		addUser:function(){
			this.$bvModal.show('newUser')
			this.$postNormal('/user/save',this.userFrom)
			.then(result=>{
			console.log(result.data);
			if(result.data.status == this.$constant.OPERATE_SUCCESS){
				//添加成功，执行刷新操作
				this.reload();
				//关闭模态框
				this.$bvModal.hide("newUser");
			}else{
				//关闭模态框
				this.$bvModal.hide("newUser");
				this.$swal({
				title: '操作失败',
				text: '新建或编辑用户出错',
				type: 'error',
				showCancelButton: false,
				buttonsStyling: true,
				confirmButtonText: '知道了',
				cancelButtonText: '取消',
				confirmButtonClass: 'btn btn-primary m-r-5',
				cancelButtonClass: 'btn btn-default',
			});
			}
		})
		},
		deleteUser:function(row){
			this.$swal({
				title: '删除确认',
				text: '确认删除此用户吗?此操作不可恢复',
				type: 'warning',
				showCancelButton: true,
				buttonsStyling: false,
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				confirmButtonClass: 'btn btn-warning m-r-5',
				cancelButtonClass: 'btn btn-default',
				// reverseButtons: true
			}).then((result) => {
				if(result.value){
					console.log("id:"+row.userId);
					this.$postRequest('user/delete',{
						userId:row.userId
						}).then(result=>{
							console.log("状态码："+JSON.stringify(result.data));
							if(result.data.status == this.$constant.OPERATE_SUCCESS){
								//删除成功
								this.reload();	
							}else{
								this.$swal({
									title: '删除失败',
									text: '删除过程出现异常，请联系管理员！',
									type: 'error',
									showCancelButton: false,
									buttonsStyling: false,
									confirmButtonText: '知道了',
									cancelButtonText: '取消',
									confirmButtonClass: 'btn btn btn-danger m-r-5',
									cancelButtonClass: 'btn btn-default',
								});
							}
						})
				}
			});

		},
		assignRole:function(){
			console.log("选中的行为："+this.$refs['my-table'].selectedRows)
			this.$refs['my-table'].selectedRows;
			this.$swal({
				title: 'Are you sure?',
				text: 'You will not be able to recover this imaginary file!',
				type: 'warning',
				showCancelButton: true,
				buttonsStyling: false,
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				confirmButtonClass: 'btn btn btn-warning m-r-5',
				cancelButtonClass: 'btn btn-default',
			});
		},
		//重置密码
		resetPassword:function(){
			this.$swal({
				title: 'Are you sure?',
				text: 'You will not be able to recover this imaginary file!',
				type: 'info',
				showCancelButton: true,
				buttonsStyling: false,
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				confirmButtonClass: 'btn btn-primary m-r-5',
				cancelButtonClass: 'btn btn-default',
			});
		},
		//禁用
		forbidden:function(){
			this.$swal({
				title: 'Are you sure?',
				text: 'You will not be able to recover this imaginary file!',
				type: 'question',
				showCancelButton: true,
				buttonsStyling: false,
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				confirmButtonClass: 'btn btn-primary m-r-5',
				cancelButtonClass: 'btn btn-default',
			});
		},
		//启用
		activate:function(){
			this.$swal({
				title: 'Are you sure?',
				text: 'You will not be able to recover this imaginary file!',
				type: 'error',
				showCancelButton: true,
				buttonsStyling: false,
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				confirmButtonClass: 'btn btn-primary m-r-5',
				cancelButtonClass: 'btn btn-default',
			});
		},
		 	updateParams(newProps) {
			this.serverParams = Object.assign({}, this.serverParams, newProps);
			},
			
			onPageChange(params) {
			this.updateParams({page: params.currentPage});
			this.loadItems();
			},

			onPerPageChange(params) {
			this.updateParams({perPage: params.currentPerPage});
			this.loadItems();
			},

			onSortChange(params) {
			this.updateParams({
				sort: [{
				type: params.sortType,
				field: this.columns[params.columnIndex].field,
				}],
			});
			this.loadItems();
			},
			
			onColumnFilter(params) {
			this.updateParams(params);
			this.loadItems();
			},

			// load items is what brings back the rows from server
			loadItems() {
			this.$postNormal('/user/users',{
			serverParams:this.serverParams
			}).then(response => {
				this.totalRecords = response.data.total;
				this.rows = response.data.data;
			});
			},
			onRowClick(params) {
				// params.row - row object 
				// params.pageIndex - index of this row on the current page.
				// params.selected - if selection is enabled this argument 
				// indicates selected or not
				// params.event - click event
				// console.log("选中："+params.selected);
				// console.log("事件："+params.event.click());
				// this.rowStyleClassFn(params.row);
			},
			
			selectionChanged(rows){
				// console.log(this.$refs['my-table'].selectedRows);
				console.log(rows.selectedRows.length);
				console.log(rows.selectedRows);

			}
    },
    created(){
		// console.log(JSON.stringify(this.serverParams))
        this.$postNormal('/user/users',{
		serverParams:this.serverParams
		}).then(result=>{
			if(result.data.status == this.$constant.OPERATE_SUCCESS){
			this.totalRecords = result.data.total;
			this.rows=result.data.data;
			}
		})
	}
	// watch: {
	// 	rows:{
	// 		handler(val, oldVal){
	// 			console.log('new: %s, old: %s', val, oldVal)
	// 		}
	// 	}
	// }
}
</script>

<style scoped>
.marginTop{
	margin-top: 9px
}
.rowStyle{
	background-color: darkorange;
	color: brown
	
}
.labelStyle{
    text-align: right;
}

</style>