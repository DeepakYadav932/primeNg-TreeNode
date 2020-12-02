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

  private addNode(node: TreeNode, currentData: TreeData): void {
    node.children = node.children || [];
    if (node.data === (currentData.depth - 1)) {
      node.children.push({ label: currentData.name, data: currentData.depth });
    } else {
      const parent: TreeNode = node.children[node.children.length - 1];
      this.addNode(parent, currentData);
    }
  }

  public toTree(data: TreeData[]): TreeNode {
    return data.reduce((node: TreeNode, currentData: TreeData, index: number) => {
      if (!currentData.depth) {
        node.label = currentData.name;
        node.data = currentData.depth;
      }
      if (index === 0) {
        node.children = [];
      } else {
        this.addNode(node, currentData);
      }
      return node;
    }, { });
  }
}

