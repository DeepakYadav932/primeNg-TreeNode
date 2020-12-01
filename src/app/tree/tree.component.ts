import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng/api';
import { TreeData } from '../models/treeModel';
import { TreeDataService } from '../tree-data.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  constructor(private treeSvc: TreeDataService) { }

  public treeData: TreeNode[] = [];

  ngOnInit(): void {
    const treeData = this.treeSvc.getTreeData();
    this.treeData = this.convertTreeDataToTreeNode(treeData);
  }

  public convertTreeDataToTreeNode(data: TreeData[]): any {
    // tslint:disable-next-line: prefer-for-of
    const treeNode: TreeNode[] = [];
    let node = { };
    for (let i = 0; i < data.length; i++) {
      const subData = [];
      const d = data[i];
      let flag = true;
      if (!d.depth) {
        subData.push(d);
        i++;
        while (data[i]?.depth) {
          subData.push(data[i]);
          i++;
          flag = false;
        }
      }
      node = this.toTree(subData);
      if (!flag) {
        i--;
      }
      treeNode.push(node);
    }
    return treeNode;
  }

  // public convertTreeDataToTreeNode(treeData: TreeData[]): TreeNode[] {
  //   const treeNode: TreeNode[] = [];
  //   // tslint:disable-next-line: prefer-for-of
  //   for (let i = 0; i < treeData.length; i++) {
  //     const data = treeData[i];
  //     const node: TreeNode = { };
  //     if (!data.depth) {
  //       node.label = data.name;
  //       i++;
  //       while (data.depth) {

  //       }
  //       const res = this.getNodeFamily(treeData, i, node);
  //       node.children = res[0];
  //       if (i !== res[1]) {
  //         i--;
  //       }
  //     }
  //     treeNode.push(node);
  //   }
  //   return treeNode;
  // }

  // public getNodeFamily(treeData: TreeData[], index: number, node: TreeNode): any {
  //   node.children = [];
  //   while (treeData[index]?.depth) {
  //     const currentDepth = treeData[index].depth;
  //     const previousDepth = treeData[index - 1].depth;
  //     if ( currentDepth === previousDepth + 1 ) {
  //       node.children.push({ label: treeData[index].name });
  //       index++;
  //       return this.getNodeFamily(treeData, index, node.children[node.children.length - 1]);
  //     } else {
  //       node.label = treeData[index].name;
  //       index++;
  //       return this.getNodeFamily(treeData, index, node);
  //     }
  //   }
  //   return [node.children, index];
  // }
  public addNode(node, o): any {
    node.children = node.children || [];
    if (node.depth === (o.depth - 1)) {
      node.children.push(o);
    } else {
      // for (const child of node.children) {
      //   addNode(child, o);
      // }
      this.addNode(node.children[node.children.length - 1], o);
    }
  }

  public toTree(data: any): any {
   // Sort data asc by depth
    const node = { } as any;
    // data.sort((a, b) => a.depth - b.depth);
    return data.reduce((prev, curr, index) => {
      curr.label = curr.name;
      if (index === 0) {
        prev = curr;
        prev.children = [];
      } else {
        this.addNode(prev, curr);
      }
      return prev;
    }, {});
  }
}

function addNode(node, o) {
  node.children = node.children || [];
  if (node.depth === (o.depth - 1)) {
    node.children.push({ label: node.name});
  }else {
    for (const child of node.children) {
      addNode(child, o);
    }
  }
}

function toTree(data) {
 // Sort data asc by depth
  data.sort((a, b) => a.depth - b.depth);


  return data.reduce((prev, curr, index) => {
    const node = { } as any;
    if (index === 0) {
      node.label = curr.name;
      prev = curr;
      prev.children = [];
    }else {
      addNode(prev, curr);
    }

    return prev;
  }, {});
}
