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

  public convertTreeDataToTreeNode(treeData: TreeData[]): TreeNode[] {
    const treeNode: TreeNode[] = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < treeData.length; i++) {
      const data = treeData[i];
      const node: TreeNode = { };
      let flag = true;
      if (!data.depth) {
        node.label = data.name;
        node.children = [];
        i++;
        while (treeData[i]?.depth) {
          node.children.push({ label: treeData[i].name });
          i++;
          flag = false;
        }
      }
      if (!flag) {
        i--;
      }
      treeNode.push(node);
    }
    return treeNode;
  }
}
