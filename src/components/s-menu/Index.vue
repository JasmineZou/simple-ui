<template>
	<div class='s-menu'>
		<i class='iconfont' :class='position' @click="handleClick">&#xe612;</i>
		<div class="modal" :class="{modalHeight: sMenuVisible}" v-if="this.showList !== 'false' && this.sMenuVisible">
			<div class="mask" @click="handleClick"></div>
			<div class="content" :class='this.position'>
				<ul class="parent-ul">
					<li :key="index" :class="{active: menu.selected}" v-for="(menu,index) in this.list" @click.stop.prevent="handleMenuItem(menu, index)">
						{{ menu.title }} <i :class="{active: menu.selected}" v-if="menu.children && menu.children.length" class="iconfont">&#xe731;</i>
						<ul v-if="menu.selected && menu.children && menu.children.length" class="child-ul">
							<li :class="{active: m.selected}" @click.stop.prevent="handleMenuItem(menu, index, m, i)" :key="i" v-for="(m,i) in menu.children">{{ m.title }}</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		<div v-if="this.showList === 'false' && this.showMenuContent">
			<children>  
				<div slot="child"></div>
			</children>
		</div>
	</div>	
</template>
<script>
	
	export default {
		name: 's-menu',
		components: {
			children: {
        template: `<div><slot name="child"></slot></div>`
    }
		},
		props: {
			showList: {
				type: String,
				default: () => "true"
			},
			position: {
				type: String,
				default: () => 'left'
			},
			changeContent: {
				type: Function,
				default: (pMenu, pID, cMenu, cID) => { console.log("父菜单：",pMenu, "父菜单索引：", pID, " 子菜单：", cMenu, " 子菜单索引：", cID); }
			},
      menuList: {
        type: Array,
        default: () => [{
					id: '0001',
					title: '菜单一',
					selected: false,
					children:[{
						id: '0011',
						parentId: '0001',
						title: '子菜单一',
						selected: false,
					}],
				},{
					id: '0002',
					title: '菜单二',
					selected: false,
				},{
					id: '0003',
					title: '菜单三',
					selected: false,

					children:[{
						id: '0031',
						parentId: '0003',
						title: '子菜单三-1',
				  	selected: false,
					},{
						id: '0032',
						parentId: '0003',
						title: '子菜单三-2',
					  selected: false,
					},{
						id: '0033',
						parentId: '0003',
						title: '子菜单三-3',
				  	selected: false,
					}],
				},{
					id: '0004',
					title: '菜单四',
					selected: false,
				}]
			},
		},
		data: () => ({
			sMenuVisible: false,
			list: [],
			showMenuContent: false,
		}),
    mounted() {
			this.list = this.menuList;
		},
		methods: {
			handleClick() {
				if (this.showList !== 'false') {
					this.sMenuVisible = !this.sMenuVisible;
				} else {
					this.showMenuContent = !this.showMenuContent;
				}
			},
			changeList() {
				this.list = this.list.map(item => {
					item.selected = false;
					if (item.children && item.children.length) {
						item.children = item.children.map(i =>{
							i.selected = false;
							return i;
						})
					}
					return item;
				})
			},
			handleMenuItem(menu, index, m, i) {
				this.changeList();
				this.list[index].selected = true;
				if (menu.children && menu.children.length) {
					if (i !== undefined) {
						this.list[index].children[i].selected = true;
						this.handleClick();
						this.changeContent(menu, index, m, i);
					}
				} else {
					this.handleClick();
					this.changeContent(menu, index);
				}
				
			}

		}
	}
</script>
<style scoped>
  .s-menu {
		background: #000;
		height: 60px;
		line-height: 60px;
		position: relative;
	}
	.iconfont {
		color: #fff;
		position: absolute;
		z-index: 1001;
		right: 15px;
	}
	.modal {
		position: fixed;
		width: 100%;
		z-index: 1000;
	}
	.modalHeight {
		height: 100%;
	}
	.mask {
		position: fixed;
		width: 100%;
		height: 100%;
		background: #000;
		opacity: .3;
		top: 60px;
	}
	.content {
		width: 300px;
		height: 100%;
		background: #fff;
		position: fixed;
		right: 0;
		top:60px;
	}

	
	ul {
		list-style: none;
		position: relative;
		color: #999;
	}
	li {
		padding-left: 20px;
		height: 80px;
		line-height: 80px;
		border-bottom: 1px solid #f2f2f2;
	}
	li.active {
		color: #000;
	}
	.left{
		left: 15px;
	}
	.content.left {
		left: 0;
		border-right: 1px solid #f2f2f2; 
	}
	.parent-ul .iconfont{
		color: #999;
	}
	.parent-ul .iconfont.active{
		color: #000;
	}
	.child-ul {
		position:absolute;
		left: 300px;
		top: 0;
		width: 300px;
	}
	.child-ul li {
		background: #fff;
	}
</style>